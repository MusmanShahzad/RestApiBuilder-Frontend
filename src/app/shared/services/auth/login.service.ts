import {
  Injectable
} from '@angular/core';
import {
  LoginUserGQL
} from '../../graphql/service';
import {
  BehaviorSubject
} from 'rxjs';
import {
  ToastrService
} from 'ngx-toastr';
import {
  Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private LoginData = new BehaviorSubject(localStorage.getItem('token'));
  LoginDataObservable = this.LoginData.asObservable();
  public user = new BehaviorSubject(null);

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}
  UpdateLogin(email, password) {
    this.http.post('http://localhost:8080/user/login', {email,password}).subscribe(ele => {
      if (ele['error']) {
        this.toastr.error(ele['message'], ele['title']);
        this.LoginData.next(null);
        this.user.next(null);
        return;
      } else {
        localStorage.setItem('token', ele['token']);
        this.LoginData.next(ele['token']);
        this.user.next(ele['user']);
        this.toastr.success('Login Success', 'Success');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
        return;
      }
    })
  }
  logout() {
    localStorage.clear();
    this.LoginData.next(null);
    this.user.next(null);
    this.router.navigate(['/auth/login']);
  }
  getUser(){
    return this.user.value;
  }
  setUser(user){
    this.user.next(user);
  }

}