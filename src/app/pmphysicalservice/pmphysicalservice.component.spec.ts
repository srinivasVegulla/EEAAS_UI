import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmphysicalserviceComponent } from './pmphysicalservice.component';

describe('PmphysicalserviceComponent', () => {
  let component: PmphysicalserviceComponent;
  let fixture: ComponentFixture<PmphysicalserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmphysicalserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmphysicalserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
