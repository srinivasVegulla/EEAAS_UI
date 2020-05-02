import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmordersummaryComponent } from './pmordersummary.component';

describe('PmordersummaryComponent', () => {
  let component: PmordersummaryComponent;
  let fixture: ComponentFixture<PmordersummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmordersummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmordersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
