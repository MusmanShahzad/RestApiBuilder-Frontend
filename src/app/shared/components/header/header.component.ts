
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { LoginService } from '../../services/auth/login.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public items: Menu[];
  public openNav: boolean = false;
  public right_sidebar: boolean = false;
  public text: string;
  public user;
  public url;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService,private loginService: LoginService,private http: HttpClient) { 
    this.url = environment.url;
   }

  ngOnInit() {
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems
    });
    this.user = this.loginService.getUser();
    
    if(this.user==null){
      this.http.get(this.url+'user').subscribe(response =>{
        this.user=response['user'];
        this.loginService.setUser(this.user);
      })
    }
  }
  logout() {
    this.loginService.logout();
  }
  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }

}
