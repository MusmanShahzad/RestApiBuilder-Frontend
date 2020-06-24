import {
  Injectable
} from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate,
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  LoginService
} from '../auth/login.service';
import {
  DatabaseComponent
} from 'src/app/components/design/database/database.component';
import {
  HttpClient
} from '@angular/common/http';
import {
  DataService
} from '../Data.service';

@Injectable({
  providedIn: 'root',
})
// tslint:disable-next-line: class-name
export class canDeactivate implements CanDeactivate < DatabaseComponent > {
  constructor(
    private router: Router,
    private loginService: LoginService, private db: DataService
  ) {}

  canDeactivate(component: DatabaseComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState ? : RouterStateSnapshot): boolean | UrlTree | Observable < boolean | UrlTree > | Promise < boolean | UrlTree > {
    if (!this.db.status.value) {
      return confirm('You have unsaved changes! if you leave your changes will be lost*');
    }
    return true;
  }
}