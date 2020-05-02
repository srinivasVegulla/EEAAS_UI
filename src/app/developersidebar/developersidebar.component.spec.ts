import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersidebarComponent } from './developersidebar.component';

describe('DevelopersidebarComponent', () => {
  let component: DevelopersidebarComponent;
  let fixture: ComponentFixture<DevelopersidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopersidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
