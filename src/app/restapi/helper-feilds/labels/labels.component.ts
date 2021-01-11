import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
