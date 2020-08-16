import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestModalPopupComponent } from './request-modal-popup.component';

describe('RequestModalPopupComponent', () => {
  let component: RequestModalPopupComponent;
  let fixture: ComponentFixture<RequestModalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestModalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
