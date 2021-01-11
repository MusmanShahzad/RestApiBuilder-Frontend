import { FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

export function VariableValidatorMessage(err, field: FormlyFieldConfig) {
  
    return `"${field.formControl.value}" should only be 0-9,A-z or _`;
  }
  export function VariableValidator(control: FormControl): ValidationErrors {
    console.log(control);
    return control.value==='valid'?{ip:true}:null;
  }