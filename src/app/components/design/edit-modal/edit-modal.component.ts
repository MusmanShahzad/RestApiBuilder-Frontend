import {
  Component,
  OnInit,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  BsModalRef
} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Table, Column } from 'src/app/shared/services/interfaces';
import { DataService } from 'src/app/shared/services/Data.service';
import { ComboBoxDataService } from 'src/app/shared/services/comboBoxData.service';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  updateColumnForm: FormGroup;
  Data: any;
  table: Table;
  column: Column;
  comboBox;
  public event: EventEmitter < any > = new EventEmitter();
  constructor(private fb: FormBuilder, private db: DataService, public bsModalRef: BsModalRef,
    private toastr:ToastrService,private ComboBoxData :ComboBoxDataService) {
    this.updateColumnForm = this.fb.group({
      //^[A-Za-z_-][a-zA-Z_0-9]*$
      name: ['', [Validators.required,Validators.pattern('^(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*$')]],
      type: [0, [Validators.required,Validators.min(1)]],
      key: [0],
      length: [20,[Validators.min(1),Validators.max(200)]],
      default: [0],
      null: [false],
    });
    
  }
  get name() {
    return this.updateColumnForm.get('name');
  }
  get type() {
    return this.updateColumnForm.get('type');
  }
  get key() {
    return this.updateColumnForm.get('key');
  }
  get length() {
    return this.updateColumnForm.get('length');
  }
  get default() {
    return this.updateColumnForm.get('default');
  }
  get null() {
    return this.updateColumnForm.get('null');
  }

  ngOnInit() {
    this.table = this.db.getTableById(this.Data.tableId);
    if(this.Data.column){
      this.column = this.Data.column;
      this.updateColumnForm = this.fb.group({
        name: [this.column.name, [Validators.required,Validators.pattern('^(_|[a-zA-Z])(_|[a-zA-Z]|[0-9])*$')]],
        type: [this.column.type, [Validators.required]],
        key: [this.column.key],
        length: [this.column.length,[Validators.min(1),Validators.max(200)]],
        default: [this.column.default],
        null: [this.column.null],
      });
    }
    if(this.ComboBoxData.comboBoxDataObservable.value){
      this.comboBox=this.ComboBoxData.comboBoxDataObservable.value;
    }
    else{
      
      this.ComboBoxData.getComboBoxData();
      this.ComboBoxData.comboBoxDataObservable.subscribe(data =>{
        console.log(data);
        this.comboBox = data;
      })
    }
  }
  triggerEvent(item: string) {
    this.event.emit({
      data: item,
      res: 200
    });
  }
  updateColumn() {

    this.triggerEvent(this.updateColumnForm.value);
    let out  = this.db.updateColumn(this.Data.tableId,{...this.updateColumnForm.value,id:this.column.id});
    if(out.status){
    this.bsModalRef.hide();
    }
    else{
      this.toastr.error(out.message,out.error);
    }
  }
  saveColumn(){
   let out = (this.db.addColumn(this.Data.tableId,this.updateColumnForm.value));
   if(out.status){
    this.bsModalRef.hide();
   }
   else{
     this.toastr.error(out.message,out.error);
   }
  }
  change(type){
    if(type=='default'){
      if(this.default.value==1){
        this.type.setValue(2);
      }
      else if(this.default.value==2){
        this.type.setValue(5);
      }
    }
  }
}
