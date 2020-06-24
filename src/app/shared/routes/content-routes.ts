
import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DatabaseComponent } from 'src/app/components/design/database/database.component';
import { ViewDatabasesComponent } from 'src/app/components/ViewDatabases/ViewDatabases.component';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { canDeactivate } from '../services/guard/canDeactivate.guard';

export const content: Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'create/:id', component: DatabaseComponent,canDeactivate:[canDeactivate]
  },
  {
    path: 'viewdatabase', component: ViewDatabasesComponent
  },
  { 
    path: 'register',component: RegisterComponent
  }
];