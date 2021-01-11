import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-object-feilds',
  templateUrl: './object-feilds.component.html',
  styleUrls: ['./object-feilds.component.scss']
})
export class ObjectFeildsComponent extends FieldType implements OnInit {
  showArray=true;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
