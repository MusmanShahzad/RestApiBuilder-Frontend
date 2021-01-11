import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css']
})
export class CheckboxFieldComponent extends FieldArrayType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeDetection(){
    this.model=!this.model;
  }
}
