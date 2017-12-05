import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLsitComponent } from './shop-lsit.component';

describe('ShopLsitComponent', () => {
  let component: ShopLsitComponent;
  let fixture: ComponentFixture<ShopLsitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopLsitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLsitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
