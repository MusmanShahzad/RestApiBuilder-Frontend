import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  updateColumnForm: FormGroup;
  Data:any;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder,public bsModalRef: BsModalRef) {
    this.updateColumnForm = this.fb.group({
      name:['', Validators.required]
    })
   }

  ngOnInit() {
console.log(this.Data);
  }
  triggerEvent(item: string) {
    this.event.emit({ data: item , res:200 });
  }
  updateColumn(){
    this.triggerEvent(this.updateColumnForm.value.name);
    this.bsModalRef.hide();
  }
}
