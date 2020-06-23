import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewDatabaseShare',
  templateUrl: './viewDatabaseShare.component.html',
  styleUrls: ['./viewDatabaseShare.component.css']
})
export class ViewDatabaseShareComponent implements OnInit {
@Input() database;
url;
isLoading = false;

  constructor(private loginService: LoginService,private http: HttpClient, private toastr: ToastrService) {
    this.url = environment.url;
   }

  ngOnInit() {
  }
  deleteProject(id){
    this.isLoading = true;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {id}
    }
    this.http.delete(`${this.url}project`,options).subscribe(ele=>{
      this.isLoading = false;
      if(ele['error']){
        this.toastr.error(ele['message'],ele['title']);
        return;
      }
      this.loginService.setUser(ele['user']);
    })
   }

}
