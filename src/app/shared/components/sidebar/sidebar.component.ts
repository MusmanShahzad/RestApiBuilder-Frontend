import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService, Menu } from '../../services/nav.service';
import { LoginService } from '../../services/auth/login.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{

  public menuItems: Menu[];
  public url: any;
  public fileurl: any;
  public user;
  constructor(private router: Router, public navServices: NavService,private loginService: LoginService,private http: HttpClient) {
    this.url = environment.url;


  }
  ngOnInit(){
    this.user = this.loginService.getUser();
    
    if(this.user==null){
      this.http.get(this.url+'user').subscribe(response =>{
        this.user=response['user'];
        this.loginService.setUser(this.user);
      })
    }
  }


}
