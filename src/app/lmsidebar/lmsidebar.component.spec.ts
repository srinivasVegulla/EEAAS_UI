import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsidebarComponent } from './lmsidebar.component';

describe('LmsidebarComponent', () => {
  let component: LmsidebarComponent;
  let fixture: ComponentFixture<LmsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
