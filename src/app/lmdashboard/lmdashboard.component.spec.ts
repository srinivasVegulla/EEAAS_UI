import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmdashboardComponent } from './lmdashboard.component';

describe('LmdashboardComponent', () => {
  let component: LmdashboardComponent;
  let fixture: ComponentFixture<LmdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
