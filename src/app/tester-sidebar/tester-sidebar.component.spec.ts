import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterSidebarComponent } from './tester-sidebar.component';

describe('TesterSidebarComponent', () => {
  let component: TesterSidebarComponent;
  let fixture: ComponentFixture<TesterSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
