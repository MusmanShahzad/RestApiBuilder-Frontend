import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sqlDownload',
  templateUrl: './sqlDownload.component.html',
  styleUrls: ['./sqlDownload.component.css']
})
export class SqlDownloadComponent implements OnInit {
  bsModalRef: BsModalRef;
  path:String;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  

}
