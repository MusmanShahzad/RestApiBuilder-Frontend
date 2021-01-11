import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayFeildComponent } from './array-feild.component';

describe('ArrayFeildComponent', () => {
  let component: ArrayFeildComponent;
  let fixture: ComponentFixture<ArrayFeildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayFeildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
