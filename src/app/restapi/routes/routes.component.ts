import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RouteEditComponent } from './../modals/route-edit/route-edit.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
@Input() routes:any;
@Output() getMethods = new EventEmitter<any>();
selected=-1;
  bsModalRef: BsModalRef;
  constructor(private modalService:BsModalService) { }

  ngOnInit(): void {
  }
  sendMethods(methods,index){
    this.selected=index;
    this.getMethods.emit(methods);
  }
  routeEditModal(route,index){

    const initialState = {
      route:route?.path,
      index
  };
    this.bsModalRef = this.modalService.show(RouteEditComponent, {initialState});
    this.bsModalRef.content.event.subscribe(data=>{
      if(data.index>-1)
      this.routes[data.index].path=data.path;
      else
      this.routes.push(
        {
        path: data.path,
          auth: true,
          methods: {
              get: {
                  auth: false,
                  getToken:false,
                  query: '',
                  variables: []
              },
              post:  {
                auth: false,
                getToken:false,
                query: '',
                variables: []
            },
              put:  {
                auth: false,
                getToken:false,
                query: '',
                variables: []
            },
              patch:  {
                auth: false,
                getToken:false,
                query: '',
                variables: []
            },
              delete:  {
                auth: false,
                getToken:false,
                query: '',
                variables: []
            }
            }
        }
      )
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  deleteRoute(i){
    this.routes.splice(i, 1);
  }

}
