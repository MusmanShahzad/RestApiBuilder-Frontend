import {
    Component,
    OnInit,
    Input, ViewChild, Injector, EventEmitter
} from '@angular/core';
import {
    FormControl,
    FormGroup
} from '@angular/forms';
import {
    FormlyFieldConfig,
    FormlyFormOptions
} from '@ngx-formly/core';
import {
    FormlyJsonschema
} from '@ngx-formly/core/json-schema';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { ActivatedRoute } from '@angular/router';
import { SqlDownloadComponent } from 'src/app/components/design/sqlDownload/sqlDownload.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-form-feild-form',
    templateUrl: './form-feild-form.component.html',
    styleUrls: ['./form-feild-form.component.scss']
})
export class FormFeildFormComponent  implements OnInit {
    fieldInput={
        projectId: 'Project linked',
        port: 8080,
        secretKey: 'Token Genrating key',
        routes: [
            {
            path: 'name',
            auth: true,
            methods: {
                get: {
                    auth: true,
                    query: 'SQL Query',
                    variables: [{
                        name: 'Name',
                        type: 'string',
                        parse: 'body',
                        validator:{
                            min:4,
                            max:5,
                            regex:''
                        }
                    }]
                },
                post: {
                    auth: true,
                    query: 'SQL Query',
                    variables: [{
                        name: 'Name',
                        type: 'int',
                        parse: 'body',
                        validator:{
                            min:4,
                            max:5,
                            regex:''
                        }
                    }]
                },
                put: {
                    auth: true,
                    query: 'SQL Query',
                    variables: [{
                        name: 'Name',
                        type: 'int',
                        parse: 'body',
                        validator:{
                            min:4,
                            max:5,
                            regex:''
                        }
                    }]
                },
                patch: {
                    auth: true,
                    query: 'SQL Query',
                    variables: [{
                        name: 'Name',
                        type: 'int',
                        parse: 'body',
                        validator:{
                            min:4,
                            max:5,
                            regex:''
                        }
                    }]
                },
                delete: {
                    auth: true,
                    query: 'SQL Query',
                    variables: [{
                        name: 'Name',
                        type: 'int',
                        parse: 'body',
                        validator:{
                            min:4,
                            max:5,
                            regex:''
                        }
                    }]
                },



            },
            children:[{
                path: 'name',
                auth: true,
                methods: {
                    get: {
                        auth: true,
                        query: 'SQL Query',
                        variables: [{
                            name: 'Name',
                            type: 'string',
                            parse: 'body',
                            validator:{
                                min:4,
                                max:5,
                                regex:''
                            }
                        }]
                    },
                    post: {
                        auth: true,
                        query: 'SQL Query',
                        variables: [{
                            name: 'Name',
                            type: 'int',
                            parse: 'body',
                            validator:{
                                min:4,
                                max:5,
                                regex:''
                            }
                        }]
                    },
                    put: {
                        auth: true,
                        query: 'SQL Query',
                        variables: [{
                            name: 'Name',
                            type: 'int',
                            parse: 'body',
                            validator:{
                                min:4,
                                max:5,
                                regex:''
                            }
                        }]
                    },
                    patch: {
                        auth: true,
                        query: 'SQL Query',
                        variables: [{
                            name: 'Name',
                            type: 'int',
                            parse: 'body',
                            validator:{
                                min:4,
                                max:5,
                                regex:''
                            }
                        }]
                    },
                    delete: {
                        auth: true,
                        query: 'SQL Query',
                        variables: [{
                            name: 'Name',
                            type: 'int',
                            parse: 'body',
                            validator:{
                                min:4,
                                max:5,
                                regex:''
                            }
                        }]
                    },
                }
            }
        ]

        }
    ]
    }
    optionShow = false;
    model: any = {};
    save=true;
    options: FormlyFormOptions;
    fields: FormlyFieldConfig[];
    form = new FormGroup({});
    schema: any;
    bsModalRef: BsModalRef;
    url=environment.url;
    _id;
    constructor(private formlyJsonschema: FormlyJsonschema,
       private http:HttpClient,
       private toastr:ToastrService,
       private loginService: LoginService,
       private route:ActivatedRoute,
       private modalService: BsModalService) {
        this.loginService.user.subscribe(ele=>{
            if(ele){
                for(const database of ele.database){
                    if(database._id===this._id){
                        this.model = database.routes&&database.routes!==''?JSON.parse(database.routes):{};
                    } 
                }
            }
          })
        }
    ngOnInit(): void {
        this.route.paramMap.subscribe(queryParams => {
            this._id=queryParams.get('id');
            let user = this.loginService.getUser();
            if(user==null){
              this.http.get(this.url+'user').subscribe(response =>{
                user=response['user'];
                this.loginService.setUser(user);
              })
            }else{
                for(const database of user.database){
                    if(database._id===this._id){
                        this.model = JSON.parse(database.routes);
                    } 
                }
            }
                this.show();
          });
    }
    buildRestapi(){
        if(this.save){
            this.http.post(this.url+"restApiBuilder",this.model).subscribe(res=>{
                if(res['error']){
                    this.toastr.error('Error Occour');
                }
                else{
                    this.openModal(res["data"].path);
                }
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
    show(){
        this.schema = (this.typeObject(this.fieldInput, ''));
        this.fields = this.formlyJsonschema.toFieldConfig(this.schema).fieldGroup;
        this.form.valueChanges.subscribe((ele) => {
            this.save=false;
        });
    }
    typeObject(objectVal: any, key: string): any {
        const out = {
            type: 'object',
            title: this.ConvertCamelCaseToSentence(key),
            properties: {

            },
            templateOptions: {

            }
        };
        for (const keys in objectVal) {
                if (objectVal[keys].constructor.name === 'Object') {
                    out.properties[keys] = this.typeObject(objectVal[keys], keys);
                } else if (objectVal[keys].constructor.name.toString() === 'Array') {

                    out.properties[keys] = this.typeArray(objectVal[keys], keys);
                } else {
                    out.properties[keys] = this.typeOther(objectVal[keys], keys);
                }
            }
        return out;
    }
    typeOther(val: any, key: string) {
        if(key==='parse')
        return {
            type:'select',
            title:this.ConvertCamelCaseToSentence(key),
            widget:{
                        formlyConfig:{
                            templateOptions:{
                                placeholder:'Parse From',
                                options:[
                                    { label: 'Body', value: 'body' },
                                    { label: 'query', value: 'query' },
                                ]
                            }
                        }
                    }
        };
        else if(key==='type')
        return {
            type:'select',
            title:this.ConvertCamelCaseToSentence(key),
            widget:{
                        formlyConfig:{
                            templateOptions:{
                                placeholder:'Type Of',
                                options:[
                                    { label: 'string', value: 'string' },
                                    { label: 'int', value: 'int' },
                                    { label: 'boolean', value: 'boolean' },
                                    { label: 'email', value: 'email' },
                                ]
                            }
                        }
                    }
        };
        else{
            if(key==='projectId'||key==='path'||key==='name'){
                return {
                    type:typeof val,
                    title:this.ConvertCamelCaseToSentence(key),
                    widget:{
                                formlyConfig:{
                                    validators: {
                                        ip: {
                                          expression: (c) => {
                                          return /^[a-zA-Z,_][a-zA-Z,_,,-,0-9]*$/.test(c.value)
                                          },
                                          message: (error, field: FormlyFieldConfig) => `"${field.formControl.value}"  is not valid e.g(a_12)`,
                                        },
                                }
                            }
                }
            }
        }
        else if(key==='port'){
            return {
                type:typeof val,
                title:this.ConvertCamelCaseToSentence(key),
                widget:{
                            formlyConfig:{
                                validators: {
                                    input: {
                                      expression: (c) => {
                                      return (c.value<9999&&c.value>999)
                                      },
                                      message: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" port no should be of 4 digit`,
                                    },
                            }
                        }
            }
        }
    }
        else{
            return {
                type:typeof val,
                title:this.ConvertCamelCaseToSentence(key),
            }
        }
        }
        
    }
    typeArray(array: [], key: string) {
        const out = {
            type: 'array',
            title: this.ConvertCamelCaseToSentence(key),
            items: {

            }
        };
        for (const item of array) {
            const type = typeof item;
            if (type === 'object') {
                out.items = this.typeObject(item, key);
            } else {
                out.items['type'] = type;
            }
        }
        return out;
    }

    submit() {
        this.http.post(`${this.url}restapi`,{...this.model,_id:this._id}).subscribe(ele=>{
            if(!ele['error']){
            this.toastr.success('Saved Successfully');
            this.save=true;
            }
          })
    }
    ConvertCamelCaseToSentence(camelCase){
       return camelCase.charAt(0).toUpperCase() + camelCase.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1').slice(1);
    }
}
