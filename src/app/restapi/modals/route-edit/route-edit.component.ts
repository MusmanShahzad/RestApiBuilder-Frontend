import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.scss']
})
export class RouteEditComponent implements OnInit {
route:string;
index:number;
event=new EventEmitter<any>();
form:FormGroup;
get path(){
  return this.form.get('path');
}
  constructor(public bsModalRef: BsModalRef,private formBuilder:FormBuilder) {
    this.form=formBuilder.group({
      path:[this.route, [Validators.required,Validators.pattern('^((_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*(\/(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])+)?)*$')]]
    })
   }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      path:[this.route, [Validators.required,Validators.pattern('^((_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*(\/(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])+)?)*$')]]
    })
  }
  save(){
    this.event.emit({path:this.path.value,index:this.index});
    this.bsModalRef.hide();
  }
  update(){
    this.event.emit({path:this.path.value,index:this.index});
    this.bsModalRef.hide();

  }

}
