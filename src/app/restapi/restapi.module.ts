import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { RestApiRoutingModule } from './restapi-routing.module';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormFeildFormComponent } from './form-feild-form/form-feild-form.component';
import { ArrayFeildComponent } from './helper-feilds/array-feild/array-feild.component';
import { ObjectFeildsComponent } from './helper-feilds/object-feilds/object-feilds.component';
import { ToastrModule } from 'ngx-toastr';
import { VariableValidator, VariableValidatorMessage } from '../shared/helper/FormlyFormValidators';
import { RoutesComponent } from './routes/routes.component';
import { MethodsComponent } from './methods/methods.component';
import { MethodFormComponent } from './method-form/method-form.component';
import { RouteEditComponent } from './modals/route-edit/route-edit.component';
import { VariableEditComponent } from './modals/variable-edit/variable-edit.component';



@NgModule({
  declarations: [
    CreateComponent,
    FormFeildFormComponent,
    ArrayFeildComponent,
    ObjectFeildsComponent,
    RoutesComponent,
    MethodsComponent,
    MethodFormComponent,
    RouteEditComponent,
    VariableEditComponent
  ],
  imports: [
    FormsModule,
  CommonModule,
    RestApiRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      maxOpened: 4,
    }),
    FormlyModule.forRoot(
      {
        types:[
        { name: 'array', component: ArrayFeildComponent },
        {name: 'object', component: ObjectFeildsComponent},
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'input',
            },
          }
        },
        // {name: 'boolean', component:CheckboxFieldComponent},
        { name: 'boolean', extends: 'checkbox' },
        { name: 'string', extends: 'input' },
        { name: 'text', extends: 'input' },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'radio-group',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'radio',
            },
          }
        },
      ]}
    ),
    FormlyBootstrapModule
  ]
})
export class RestapiModule { }
