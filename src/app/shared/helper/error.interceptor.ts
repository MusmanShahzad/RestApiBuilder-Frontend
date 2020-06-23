import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../services/auth/login.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private loginService:LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
       return next.handle(request).pipe(
           catchError(err => {
            if (err.status === 401) {
                this.loginService.logout();
                // tslint:disable-next-line: deprecation
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}