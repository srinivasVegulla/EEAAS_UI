import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMyReservationsComponent } from './process-my-reservations.component';

describe('ProcessMyReservationsComponent', () => {
  let component: ProcessMyReservationsComponent;
  let fixture: ComponentFixture<ProcessMyReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessMyReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessMyReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
