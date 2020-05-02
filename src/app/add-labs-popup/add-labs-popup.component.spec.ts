import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabsPopupComponent } from './add-labs-popup.component';

describe('AddLabsPopupComponent', () => {
  let component: AddLabsPopupComponent;
  let fixture: ComponentFixture<AddLabsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
