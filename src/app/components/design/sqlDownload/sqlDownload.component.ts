import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from './../../../../environments/environment';
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
    this.path=environment.url+this.path;
  }
}
