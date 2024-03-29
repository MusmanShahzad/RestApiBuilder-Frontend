import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFieldComponent } from './header-field.component';

describe('HeaderFieldComponent', () => {
  let component: HeaderFieldComponent;
  let fixture: ComponentFixture<HeaderFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
