
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginService } from './shared/services/auth/login.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditModalComponent } from './components/design/edit-modal/edit-modal.component';
import { DatabaseComponent } from './components/design/database/database.component';
import { ColumnComponent } from './components/design/column/column.component';
import { TableComponent } from './components/design/table/table.component';
import { DataService } from './shared/services/Data.service';
import { ComboBoxDataService } from './shared/services/comboBoxData.service';
import { ViewDatabasesComponent } from './components/ViewDatabases/ViewDatabases.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { JwtInterceptor } from './shared/helper/jwt.interceptor';
import { ViewDatabaseShareComponent } from './components/viewDatabaseShare/viewDatabaseShare.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    LoginComponent,
    TableComponent,
      EditModalComponent,
      DatabaseComponent,
      ColumnComponent,
      ViewDatabasesComponent,
      RegisterComponent,
      ViewDatabaseShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    GraphQLModule,
    ToastrModule.forRoot({
      maxOpened: 4,
    }),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DragDropModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [LoginService,DataService,ComboBoxDataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
