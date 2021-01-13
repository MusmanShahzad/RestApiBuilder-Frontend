import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SqlDownloadComponent } from 'src/app/components/design/sqlDownload/sqlDownload.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  url = environment.url;
routes:any;
method:any;
fieldInput;any;
_id:string;
selectedMethod:any;
form:FormGroup;
bsModalRef:BsModalRef;
loading=false;
buildRestAPiLoading=false;
dataLoading=false;
get databaseName(){
    return  this.form.get('databaseName');
}
get port(){
    return  this.form.get('port');
}
get token(){
    return  this.form.get('token');
}
  constructor(
    private http:HttpClient,
    private formBuilder:FormBuilder,
    private loginService: LoginService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private modalService:BsModalService
  ) {
    this.buildFormGroup();
        this.loginService.user.subscribe(ele=>{
            if(ele){
                for(const database of ele.database){
                    if(database._id===this._id){
                        this.fieldInput = database.routes&&database.routes!==''?JSON.parse(database.routes):{};
                        this.buildFormGroup();
                    } 
                }
            }
          })
   }
   ngOnInit(): void {
    this.route.paramMap.subscribe(queryParams => {
      this.dataLoading=true;
        this._id=queryParams.get('id');
        let user = this.loginService.getUser();
        if(user==null){
          this.http.get(this.url+'user').subscribe(response =>{
            this.dataLoading=false;
            user=response['user'];
            this.loginService.setUser(user);
          })
        }else{
          this.dataLoading=false;
            for(const database of user.database){
                if(database._id===this._id){
                  this.fieldInput = database.routes&&database.routes!==''?JSON.parse(database.routes):{};
                    this.buildFormGroup();
                } 
            }
        }
      });
  }
  onSubmit() {
      this.fieldInput['databaseName']=this.databaseName.value;
      this.fieldInput['port']=parseInt(this.port.value);
      this.fieldInput['secretKey']=this.token.value;
      this.save();
  }
  buildFormGroup(){
    this.form= this.formBuilder.group({
        databaseName:[this.fieldInput?.databaseName,
         [ Validators.required,Validators.pattern('^(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*$')]],
          port:[this.fieldInput?.port,[Validators.required,Validators.min(1000),Validators.max(9999)]],
          token:[this.fieldInput?.secretKey,[Validators.required]]
      });
  }
  buildRestapi(){
    if(this.save){
      this.buildRestAPiLoading=true;
        this.http.post(this.url+"restApiBuilder",this.fieldInput)
        .subscribe(res=>{
      this.buildRestAPiLoading=false;

            if(res['error']){
                this.toastr.error('Error Occour');
            }
            else{
                this.openModal(res["data"].path);
            }
        })
    }
    else{
      this.toastr.error('Save Form First','Error');
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
  
  sendMethods(method){
    this.selectedMethod=null;
    this.method=method;
  }
  buildForm(m){
      this.selectedMethod=m;
  }
  save(){
    this.loading=true;
    this.http.post(`${this.url}restapi`,{...this.fieldInput,_id:this._id}).subscribe(ele=>{
      this.loading=false;
        if(!ele['error']){
        this.toastr.success('Saved Successfully');
        }
        else{
            this.toastr.error('Error while saving');
        }
      })
  }
}
