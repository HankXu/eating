import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicGoodsListComponent } from './characteristic-goods-list.component';

describe('CharacteristicGoodsListComponent', () => {
  let component: CharacteristicGoodsListComponent;
  let fixture: ComponentFixture<CharacteristicGoodsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacteristicGoodsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicGoodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
