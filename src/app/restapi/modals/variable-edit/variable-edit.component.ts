import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-variable-edit',
  templateUrl: './variable-edit.component.html',
  styleUrls: ['./variable-edit.component.scss']
})
export class VariableEditComponent implements OnInit {
form:FormGroup;
variable:any;
index:number;
event=new EventEmitter<any>();
options=[
  { label: 'string', value: 'string' },
  { label: 'int', value: 'int' },
  { label: 'boolean', value: 'boolean' },
  { label: 'email', value: 'email' },
  { label: 'file', value: 'file' },
];
parse=[
  { label: 'Body', value: 'body' },
  { label: 'query', value: 'query' },
]
  constructor(public bsModalRef: BsModalRef,private formBuilder:FormBuilder) {
    this.form=this.formBuilder.group({
      name:[this.variable?.name,[Validators.required,Validators.pattern('^((_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*(\/(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])+)?)*$')]],
      type:[this.variable?.type,[Validators.required]],
      parse:[this.variable?.type,[Validators.required]],
      validator:this.formBuilder.group({
        min:[this.variable?.validator.min],
        max:[this.variable?.validator.max],
        regex:[this.variable?.validator.regex]
      })
    })
   }
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:[this.variable?.name,[Validators.required,Validators.pattern('^((_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*(\/(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])+)?)*$')]],
      type:[this.variable?.type,[Validators.required]],
      parse:[this.variable?.parse,[Validators.required]],
      validator:this.formBuilder.group({
        min:[this.variable?.validator.min],
        max:[this.variable?.validator.max],
        regex:[this.variable?.validator.regex]
      })
    })
  }
  save(){
    this.event.emit({variable:this.form.value,index:this.index});
    this.bsModalRef.hide();
  }
  update(){
    this.event.emit({variable:this.form.value,index:this.index});
    this.bsModalRef.hide();
  }
}
