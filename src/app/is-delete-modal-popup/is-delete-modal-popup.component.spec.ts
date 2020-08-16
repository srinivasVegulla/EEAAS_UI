import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDeleteModalPopupComponent } from './is-delete-modal-popup.component';

describe('IsDeleteModalPopupComponent', () => {
  let component: IsDeleteModalPopupComponent;
  let fixture: ComponentFixture<IsDeleteModalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsDeleteModalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsDeleteModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
