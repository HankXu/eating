import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreateorderComponent } from './order-createorder.component';

describe('OrderCreateorderComponent', () => {
  let component: OrderCreateorderComponent;
  let fixture: ComponentFixture<OrderCreateorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCreateorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreateorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
