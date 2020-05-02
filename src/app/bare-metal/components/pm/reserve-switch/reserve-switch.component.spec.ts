import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveSwitchComponent } from './reserve-switch.component';

describe('ReserveSwitchComponent', () => {
  let component: ReserveSwitchComponent;
  let fixture: ComponentFixture<ReserveSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
