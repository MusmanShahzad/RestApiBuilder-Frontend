import {
  Database,
  Table,
  Column
} from './interfaces';
import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private databasesObservable = new BehaviorSubject < Database > (null);
  public  status = new BehaviorSubject < boolean > (true);
  database = this.databasesObservable.asObservable();
  constructor() {}
  getDatabase(): Database {
    return this.databasesObservable.value;
  }
  setDatabase(database){
    return this.databasesObservable.next(database);
  }
  addTable(name): boolean {
    const temp = this.databasesObservable.value;
    if (name) {
      if (this.tableNameCheck(name)) {
        temp.tables.push(this.defaultTable(name));
        this.status.next(false);
        return true;
      }
      return false;
    }
    return false;
  }
  deleteTable(id: string): boolean {
    const temp = this.databasesObservable.value;

    temp.tables = temp.tables.filter(table => {
      return table.id !== id;
    });
    this.status.next(false);
    return true;
  }
  changeTableName(id: string, name: string): boolean {
    const temp = this.databasesObservable.value.tables;
    if (this.tableNameCheck(name)) {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp[i].name = name;
          this.status.next(false);
          return true;
        }
      }
      return false;
    }
    return false;
  }
  tableNameCheck(name): boolean {
    return this.databasesObservable.value.tables.find(table => {
      return table.name == name;
    }) == null;
  }
  defaultTable(name): Table {
    const id = uuidv4();
    const table: Table = {
      id,
      name: name ? name : id,
      columns: []
    };

    return table;
  }
  getTableById(id: string): Table {
    return this.databasesObservable.value.tables.find(table => {
      return table.id === id;
    });
  }
  addColumn(tableId: string, column: Column) {
    
    if (this.checkColumnName(tableId, column.name)) {
    const table = this.getTableById(tableId);
    column.id = uuidv4();
    table.columns.push(column);
    this.status.next(false);
    return {status:true};
    } else {
      console.log('column name found');
      return {error: 'duplicated', message: 'column name already exit in table',status:false};
    }

  }
  updateColumn(tableId: string, column: Column) {
   const columns =  this.getTableById(tableId).columns;
   for (const columnTemp of columns) {
     if (columnTemp.name === column.name && columnTemp.id !== column.id) {
       return{error: 'duplicated', message: 'column name already exit in table', status: false};
     }
   }
   for (let i = 0; i < columns.length; i++) {
    if (columns[i].id === column.id) {
      columns[i] = column;
      this.status.next(false);
      return {status: true};
    }
  }
  }
  deleteColumn(tableId: string, columnId: string) {
   const table = this.getTableById(tableId);
   let temp = [];
   for(let i=0;i<table.columns.length;i++){
     if(table.columns[i].id!=columnId){
       temp.push(table.columns[i]);
     }
   }
   this.status.next(false);
   table.columns=temp;
  //  table.columns = table.columns.filter(column => {
  //    console.log(column.id != columnId);
  //    column.id != columnId;
  //  });
  }
  getColumnById(tableId: string, columnId: string) {
    return this.getTableById(tableId).columns.filter(column => {
      return column.id === columnId;
    });
  }
  checkColumnName(tableId: string, columnName: string): boolean {
    const temp = (this.getTableById(tableId).columns.filter(column => {
      return (column.name === columnName);
    }));
    return temp == null || temp.length == 0;
  }
  updateStatus(status){
    this.status.next(status);
  }
}
