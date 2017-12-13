import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifiInfoComponent } from './qualifi-info.component';

describe('QualifiInfoComponent', () => {
  let component: QualifiInfoComponent;
  let fixture: ComponentFixture<QualifiInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualifiInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
