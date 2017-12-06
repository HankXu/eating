import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCategoryListComponent } from './goods-category-list.component';

describe('GoodsCategoryListComponent', () => {
  let component: GoodsCategoryListComponent;
  let fixture: ComponentFixture<GoodsCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
