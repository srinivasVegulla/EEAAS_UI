import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerSidebarComponent } from './designer-sidebar.component';

describe('DesignerSidebarComponent', () => {
  let component: DesignerSidebarComponent;
  let fixture: ComponentFixture<DesignerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
