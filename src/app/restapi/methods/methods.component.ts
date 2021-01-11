import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent implements OnInit {
@Input() method:any;
@Input() path:string;
@Output() selectedMethod=new EventEmitter<any>();
keys;


  constructor() { }

  ngOnInit(): void {
  }
  getKeys(){
    if(this.method)
   return Object.keys(this.method);
    else
    return [];
  }
  getMethod(methodKey){
    this.keys=methodKey;
    this.selectedMethod.emit(this.method[methodKey]);
  }
}
