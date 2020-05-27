import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RestApiBuilder';
  defaultTable = {
    _id: 'randomId',
    name: 'randomId',
    columns: [
      {
      _id: 'tableId-randomId',
      name: 'randomId',
      key: 'keyType',
      type: 'varchar',
      length: 255,
      options: {
        null: false,
        default: ''
      }
  }
    ]
  };
  Database = {
    tables: [
      this.defaultTable
    ]
  };

}
