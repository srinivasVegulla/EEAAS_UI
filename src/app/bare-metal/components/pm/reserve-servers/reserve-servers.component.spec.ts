import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveServersComponent } from './reserve-servers.component';

describe('ReserveServersComponent', () => {
  let component: ReserveServersComponent;
  let fixture: ComponentFixture<ReserveServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
