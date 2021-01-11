import { cloneDeep } from 'lodash';
import { Component, OnInit, Input } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-feild',
  templateUrl: './preview-feild.component.html',
  styleUrls: ['./preview-feild.component.scss']
})
export class PreviewFeildComponent implements OnInit {
@Input() formField;
@Input() model:any;

tempOptions: FormlyFormOptions;
tempFields: FormlyFieldConfig[];
tempForm = new FormGroup({});
  constructor() {
  }

  ngOnInit(): void {
  }
  changeForm(val){
    let temp={};
    for(let i in val[0]){
      if(i!='hideExpression'){
        temp[i]=val[0][i];
      }
    }
    return this.changeType(temp);
  }
  changeType(val): FormlyFieldConfig[] {
    return [val];
  }

}
