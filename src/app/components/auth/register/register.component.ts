import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  isLoading:boolean = false;
  constructor(private fb:FormBuilder,private toastr: ToastrService,private router: Router,private httpClient:HttpClient) { 
    this.registerForm = this.fb.group({
      name:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      email:['',[Validators.required,Validators.email]]
    })
  }

  ngOnInit() {
  }
  uploadedFiles:any;
  fileChange(event){
    this.uploadedFiles = event.target.files;
  }
  register(val){
    // const HttpUploadOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
    // }
    this.isLoading=false;
    const formData = new FormData();
    formData.append('data',JSON.stringify({...this.registerForm.value}));
    formData.append('file', this.uploadedFiles[0]);
    this.httpClient.post(environment.url+'user', formData).subscribe(ele=>{
      this.isLoading=false;
      if(ele['error']){
        this.toastr.error(ele['message'],ele['message']);
      }
      else{
        this.toastr.success('Logged in successfully','Success');
        localStorage.setItem('token',ele['token']);
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
