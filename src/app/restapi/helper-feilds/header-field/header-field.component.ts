import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-header-field',
  templateUrl: './header-field.component.html',
  styleUrls: ['./header-field.component.css']
})
export class HeaderFieldComponent extends FieldType implements OnInit  {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
