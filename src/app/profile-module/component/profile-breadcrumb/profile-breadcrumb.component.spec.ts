import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBreadcrumbComponent } from './profile-breadcrumb.component';

describe('ProfileBreadcrumbComponent', () => {
  let component: ProfileBreadcrumbComponent;
  let fixture: ComponentFixture<ProfileBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
