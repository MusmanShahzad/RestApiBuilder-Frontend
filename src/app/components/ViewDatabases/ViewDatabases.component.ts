import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/services/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ViewDatabases',
  templateUrl: './ViewDatabases.component.html',
  styleUrls: ['./ViewDatabases.component.css']
})
export class ViewDatabasesComponent implements OnInit {
public projects;
public url;
createProjectLoading=false;
createProjectForm: FormGroup;
get name() {
  return this.createProjectForm.get('name');
}
  constructor(private http: HttpClient,private loginService: LoginService, private fb: FormBuilder,private toastr: ToastrService) {
    this.url = environment.url;
    this.createProjectForm = this.fb.group({
      name: ['',Validators.required]
    });
    this.loginService.user.subscribe(ele=>{
      if(ele){
      this.projects = ele.database;
      }
    })
   }
   createProject(){
    this.createProjectLoading=true;
     this.http.post(`${this.url}project`,{...this.createProjectForm.value}).subscribe(ele=>{
      this.createProjectLoading=false;
       if(ele['error']){
         this.toastr.error(ele['message'],ele['title']);
         return;
       }
       this.loginService.setUser(ele['user']);
       this.projects = ele['user'].database;
     })
   }
   
  ngOnInit() {
    let user = this.loginService.getUser();
    if(user==null){
      this.http.get(this.url+'user').subscribe(response =>{
        user=response['user'];
        this.loginService.setUser(user);
        this.projects = user.database;
      })
    }else{
      this.projects = user.database;
    }
  }

}
