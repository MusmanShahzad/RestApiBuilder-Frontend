import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VariableEditComponent } from '../modals/variable-edit/variable-edit.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-method-form',
  templateUrl: './method-form.component.html',
  styleUrls: ['./method-form.component.scss']
})
export class MethodFormComponent implements OnInit {
@Input() method:any;
fields: FormlyFieldConfig[]= [
  {
    key: 'query',
    type: 'textarea',
    templateOptions: {
      label: 'Query',
      placeholder: 'Query'
    }
  },
  {
    key: 'auth',
    type: 'boolean',
    templateOptions: {
      label: 'auth',
      placeholder: 'auth',
    }
  },
  {
    key: 'getToken',
    type: 'boolean',
    templateOptions: {
      label: 'Get Token',
      placeholder: 'Get Token',
    }
  }
];
    form = new FormGroup({});
// {
//   name: 'Name',
//   type: 'string',
//   parse: 'body',
//   validator:{
//       min:4,
//       max:5,
//       regex:''
//   }
// }
bsModalRef: BsModalRef;

  constructor(private modalService:BsModalService,
    private formBuilder:FormBuilder,) {
   }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(ele=>{
      setTimeout(()=>{ ele.query.match(/\$\{[a-zA-Z_][a-zA-Z_0-9]*\}/g).forEach(element => {
        if(this.method.variables.filter(variable=>{
          return variable.name===element.replace('${','').replace('}','');
        }).length===0)
        {
          this.method.variables.push({
            name:element.replace('${','').replace('}',''),
            type:'string',
            parse:'body',
            validator:{
              min:0,
              max:0,
              regex:''
            }
          })
        } }, 1000);
      });
    })
  }
  getForm(){
  }
  openVariableEditModal(variable,index){
    const initialState = {
      variable,
      index
  };
    this.bsModalRef = this.modalService.show(VariableEditComponent, {initialState});
    this.bsModalRef.content.event.subscribe(data=>{
      if(data.index>-1)
      this.method.variables[data.index]=data.variable;
      else
      this.method.variables.push(data.variable)
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }  
}
