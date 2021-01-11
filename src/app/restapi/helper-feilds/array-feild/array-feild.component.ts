import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-array-feild',
  templateUrl: './array-feild.component.html',
  styleUrls: ['./array-feild.component.scss']
})
export class ArrayFeildComponent extends FieldArrayType implements OnInit {
  showArray=false;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
