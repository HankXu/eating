import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSubNavComponent } from './shop-sub-nav.component';

describe('ShopSubNavComponent', () => {
  let component: ShopSubNavComponent;
  let fixture: ComponentFixture<ShopSubNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSubNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
