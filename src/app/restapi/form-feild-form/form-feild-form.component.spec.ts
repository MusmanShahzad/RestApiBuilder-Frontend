import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFeildFormComponent } from './form-feild-form.component';

describe('FormFeildFormComponent', () => {
  let component: FormFeildFormComponent;
  let fixture: ComponentFixture<FormFeildFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFeildFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFeildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
