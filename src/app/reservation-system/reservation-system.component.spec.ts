import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSystemComponent } from './reservation-system.component';

describe('ReservationSystemComponent', () => {
  let component: ReservationSystemComponent;
  let fixture: ComponentFixture<ReservationSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
