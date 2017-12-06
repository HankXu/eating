import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfoBarComponent } from './shop-info-bar.component';

describe('ShopInfoBarComponent', () => {
  let component: ShopInfoBarComponent;
  let fixture: ComponentFixture<ShopInfoBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInfoBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
