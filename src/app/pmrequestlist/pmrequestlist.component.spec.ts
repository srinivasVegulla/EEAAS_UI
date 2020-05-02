import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrequestlistComponent } from './pmrequestlist.component';

describe('PmrequestlistComponent', () => {
  let component: PmrequestlistComponent;
  let fixture: ComponentFixture<PmrequestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmrequestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmrequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
