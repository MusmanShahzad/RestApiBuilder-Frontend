import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectFeildsComponent } from './object-feilds.component';

describe('ObjectFeildsComponent', () => {
  let component: ObjectFeildsComponent;
  let fixture: ComponentFixture<ObjectFeildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectFeildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectFeildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
