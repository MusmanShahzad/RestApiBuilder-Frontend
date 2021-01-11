import { Component, OnInit, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Database } from 'src/app/shared/services/interfaces';
import { DataService } from 'src/app/shared/services/Data.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { SqlDownloadComponent } from '../sqlDownload/sqlDownload.component';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
database: Database;
tableForm:FormGroup;
buildRestapiLoading=false;
buildSqlLoading=false;
id;
bsModalRef: BsModalRef;
url;
saveLoading=false;
saveStatus;
get name() {
  return this.tableForm.get('name');
}
nameError:boolean=false;
  constructor(private db: DataService,private toastr: ToastrService, 
    private router:Router,
    private fb: FormBuilder,private route:ActivatedRoute,private http:HttpClient,
    private modalService: BsModalService,private loginService:LoginService) {
      this.url = environment.url;
      this.db.status.subscribe(data=>{
        this.saveStatus=data;
      })
    this.tableForm = this.fb.group({
      name: ['', [Validators.pattern('(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*'),Validators.required]]
    });
   }
   @HostListener('window:beforeunload')
   canDeactivate(): Observable<boolean> | boolean {
     // insert logic to check if there are pending changes here;
     // returning true will navigate without confirmation
     // returning false will show a confirm dialog before navigating away
     return this.saveStatus;
   }
  ngOnInit() {
    let user = this.loginService.getUser();
    this.route.paramMap.subscribe(queryParams => {
      this.id=queryParams.get('id');
    });
    if(user==null){
      this.http.get(this.url+'user').subscribe(response =>{
        user=response['user'];
        this.loginService.setUser(user);
        for(let i=0;i<user.database.length;i++){
          if(user.database[i]._id==this.id){
          this.db.setDatabase(user.database[i]);
          this.database = user.database[i];
          }
        }
      })
    }
    else{
      for(let i=0;i<user.database.length;i++){
        if(user.database[i]._id==this.id){
        this.db.setDatabase(user.database[i]);
        this.database = user.database[i];
        }
      }
    }
  }
  BuildSql(){
    this.buildSqlLoading=true;
    if(!this.saveStatus){
      this.saveLoading=true;
      this.http.put(this.url+'project',{...this.db.getDatabase()}).subscribe(ele=>{
        this.saveLoading=false;
        if(ele['error']){
          this.toastr.error(ele['message'],ele['title']);
          this.buildSqlLoading=false;
        }
        this.db.updateStatus(true);
        this.loginService.setUser(ele['user']);
        this.toastr.success('Database saved SuccessFully','success');
        this.generateSql();
      })
    }
    else{
      this.generateSql();
    }
    
  }
  generateSql(){
    this.buildSqlLoading=true;
    this.http.post(environment.url+'sql',this.db.getDatabase()).subscribe((response)=>{
    this.buildSqlLoading=false;
    if(response['error']){
      this.toastr.error(response['message'],response['title']);
    } 
      this.openModal(response['data'].path)
    })
  }
  updateDatabase(){
    if(!this.saveStatus){
    this.saveLoading=true;
    this.http.put(this.url+'project',{...this.db.getDatabase()}).subscribe(ele=>{
      this.saveLoading=false;
      if(ele['error']){
        this.toastr.error(ele['message'],ele['title']);
      }
      this.db.updateStatus(true);
      this.loginService.setUser(ele['user']);
      this.toastr.success('Database saved SuccessFully','success');
    })
  }
  }
  openModal(path) {
    const initialState = {
      path
  };
    this.bsModalRef = this.modalService.show(SqlDownloadComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    // this.bsModalRef.content.event.subscribe(res => {
    //   console.log(res.data);
    // });
  }
  BuildRestApi(){
    if(!this.saveStatus){
      this.saveLoading=true;
      this.http.put(this.url+'project',{...this.db.getDatabase()}).subscribe(ele=>{
        this.saveLoading=false;
        if(ele['error']){
          this.toastr.error(ele['message'],ele['title']);
        }
        this.db.updateStatus(true);
        this.loginService.setUser(ele['user']);
        this.toastr.success('Database saved SuccessFully','success');
        this.generateRestapi();
      })
    }
    else{
      
      this.generateRestapi();
    }
    
  }
  generateRestapi(){
    this.http.post(environment.url+'restapi/convert',this.db.getDatabase()).subscribe((response)=>{
      if(response['error']){
        this.toastr.error(response['message'],response['title']);
      }
      else{
        this.loginService.setUser(response['user']);
        this.router.navigate(['./../../restapi/create',this.db.getDatabase()._id])
      }
        })
  }
  addTable(){
    if(!this.db.addTable(this.name.value)){
      this.toastr.error('Table with name already exits','Error')
    }
  }
  tableNameCheck(){
    this.nameError = !this.db.tableNameCheck(this.name.value);
  }
  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
  }

}
