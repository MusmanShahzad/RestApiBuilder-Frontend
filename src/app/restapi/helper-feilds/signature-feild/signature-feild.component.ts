import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FieldType } from '@ngx-formly/core';
@Component({
  selector: 'app-signature-feild',
  templateUrl: './signature-feild.component.html',
  styleUrls: ['./signature-feild.component.scss']
})
export class SignatureFeildComponent extends FieldType implements OnInit  {
  @ViewChild ('signatureCanvas', { static: false }) signaturePad: SignaturePad;
  preview:boolean =false;
   signaturePadOptions = {
    minWidth: 5,
    canvasWidth:500,
    canvasHeight: 200,
    penColor: 'rgb(66, 133, 244)'

  };

  ngOnInit(): void {
      if(this.model[''+this.key]){
          this.preview=true;
      }

  }
  drawStart(){
  }
  drawComplete(){
    this.model[''+this.key]=this.signaturePad.toDataURL();
  }
  clearSignature(){


    this.signaturePad.clear();
    this.preview=false;
    this.model[''+this.key]=undefined;
    delete this.model[''+this.key];
  }
}
