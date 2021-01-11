import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFeildComponent } from './preview-feild.component';

describe('PreviewFeildComponent', () => {
  let component: PreviewFeildComponent;
  let fixture: ComponentFixture<PreviewFeildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFeildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
