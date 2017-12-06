import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EOrderListComponent } from './e-order-list.component';

describe('EOrderListComponent', () => {
  let component: EOrderListComponent;
  let fixture: ComponentFixture<EOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
