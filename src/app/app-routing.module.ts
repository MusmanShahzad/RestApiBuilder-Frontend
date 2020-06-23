import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from "./shared/routes/content-routes";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './shared/services/guard/auth.guard';
import { LoginGuard } from './shared/services/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    canActivate: [LoginGuard],
    pathMatch: 'full'
  },
  {
    'path': 'auth/login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    'path': 'auth/register',
    canActivate: [LoginGuard],
    component: RegisterComponent
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: content
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
