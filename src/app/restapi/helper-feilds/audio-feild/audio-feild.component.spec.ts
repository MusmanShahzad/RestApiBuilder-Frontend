import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFeildComponent } from './audio-feild.component';

describe('AudioFeildComponent', () => {
  let component: AudioFeildComponent;
  let fixture: ComponentFixture<AudioFeildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioFeildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
