import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUsageChartComponent } from './device-usage-chart.component';

describe('DeviceUsageChartComponent', () => {
  let component: DeviceUsageChartComponent;
  let fixture: ComponentFixture<DeviceUsageChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceUsageChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceUsageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
