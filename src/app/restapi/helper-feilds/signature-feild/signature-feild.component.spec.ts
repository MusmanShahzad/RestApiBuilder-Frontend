import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureFeildComponent } from './signature-feild.component';

describe('SignatureFeildComponent', () => {
  let component: SignatureFeildComponent;
  let fixture: ComponentFixture<SignatureFeildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureFeildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
