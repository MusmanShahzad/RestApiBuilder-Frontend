import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { ToastrService } from 'ngx-toastr';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading = false;
  public newUser = false;
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    email: '',
    password: '',
  };
  public errorMessage: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService) {
    this.loginForm = fb.group({
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['test123', Validators.required]
    });
  }

  ngOnInit() {
  }

  // Simple Login
  login() {
   
    this.loginService.LoginDataObservable.subscribe(message =>{
      // if(message!==null){
      //   if(message.errors){
      //     message.errors.forEach(ele=>{
      //       this.toastr.error(ele.error,'Server Error');
      //     })
      //   }
      //   else if(message.data?.LoginUser?.Errors!=null&&message.data?.LoginUser?.Errors.length>0){
      //     message.data.LoginUser.Errors.forEach(ele=>{
      //       console.log(ele.error);
      //       this.toastr.error(ele.error,ele.message,{
      //         progressBar: true
      //       });
      //     });
      //   }
      //   else{
          // this.toastr.success('Login Success','Success');
          // setTimeout(()=>{
          //   this.router.navigate(['/dashboard']);
          // },1000);
      //   }
      //   this.isLoading = false;
      // }
      if(message==null){
      this.isLoading=false;
      }
      
    }
    );
    this.loginService.UpdateLogin(this.loginForm.value.email, this.loginForm.value.password)
    this.isLoading = true;
  }

}
