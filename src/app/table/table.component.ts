import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() table;
  constructor(private modalService: BsModalService) {

   }

  ngOnInit() {

  }
  openModal(i) {
    const initialState = {
      Data:{
        columns:this.table.columns,
        currentColumn:this.table.columns[i]
      }
  };
    this.bsModalRef = this.modalService.show(EditModalComponent,{initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe(res => {
      console.log(res.data);
    });
  }


}
