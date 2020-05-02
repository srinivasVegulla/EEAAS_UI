import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmReqProcessingComponent } from './lm-req-processing.component';

describe('LmReqProcessingComponent', () => {
  let component: LmReqProcessingComponent;
  let fixture: ComponentFixture<LmReqProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmReqProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmReqProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
