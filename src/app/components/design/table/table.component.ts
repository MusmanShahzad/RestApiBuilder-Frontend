import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/Data.service';
import { Table } from 'src/app/shared/services/interfaces';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() table: Table;
  @Input() index: number;
  TableData;
  name;
  change=false;
  constructor(private toastr: ToastrService, private db: DataService, private modalService: BsModalService) {
   }

  ngOnInit() {
  }
  deleteTable(id) {
    if (!this.db.deleteTable(id)) {
      this.toastr.error('Error deleting table', 'error');
    }
  }
  drop(event: CdkDragDrop<[]>) {
    console.log('here');
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

    const out=  this.db.addColumn(this.table.id,event.previousContainer.data[event.previousIndex]);
    if(!out.status){
      const initialState = {
        Data: {
          new: true,
          column:event.previousContainer.data[event.previousIndex],
          update: false,
          tableId:this.table.id
        },
    };
      this.bsModalRef = this.modalService.show(EditModalComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
      this.bsModalRef.content.event.subscribe(res => {
        console.log(res.data);
      });
    }
      // transferArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    }
  }
  updateTable(){
    if(this.table.name==this.name){
      this.change=false;
      return;
    }
    if(!this.db.changeTableName(this.table.id,this.name)){
      this.toastr.error('Error name already exits','Duplicate')
    }
    else{
      this.change=false;
    }
  }
  openModal() {
    const initialState = {
      Data: {
        new: true,
        update: false,
        tableId:this.table.id
      },
  };
    this.bsModalRef = this.modalService.show(EditModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe(res => {
      console.log(res.data);
    });
  }

}
