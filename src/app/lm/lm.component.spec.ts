import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmComponent } from './lm.component';

describe('LmComponent', () => {
  let component: LmComponent;
  let fixture: ComponentFixture<LmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
