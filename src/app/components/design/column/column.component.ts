import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Column } from 'src/app/shared/services/interfaces';
import { DataService } from 'src/app/shared/services/Data.service';
import { ComboBoxDataService } from 'src/app/shared/services/comboBoxData.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
  bsModalRef: BsModalRef;
@Input() column: Column;
@Input() tableId: string;
comboBox;
  constructor(private ComboBoxData:ComboBoxDataService,private modalService: BsModalService, private db: DataService) { }

  ngOnInit() {
    if(this.ComboBoxData.comboBoxDataObservable.value){
      this.comboBox=this.ComboBoxData.comboBoxDataObservable.value;
    }
    else{
      this.ComboBoxData.getComboBoxData();
      this.ComboBoxData.comboBoxDataObservable.subscribe(data =>{
        this.comboBox = data;
      })
    }

  }
  openModal(i) {
    const initialState = {
      Data: {
        column: this.column,
        new: false,
        update: true,
        tableId: this.tableId
      }
  };
    this.bsModalRef = this.modalService.show(EditModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe(res => {
      console.log(res.data);
    });
  }
  deleteColumn(){
    this.db.deleteColumn(this.tableId,this.column.id);
  }

}
