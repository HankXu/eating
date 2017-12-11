import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { UserAddressesComponent } from './component/user-addresses/user-addresses.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { ProfileMenuComponent } from './component/profile-menu/profile-menu.component';
import { ProfileBreadcrumbComponent } from './component/profile-breadcrumb/profile-breadcrumb.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { UserPasswordComponent } from './component/user-password/user-password.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderService } from './service/order.service';
import { MenuService } from './service/menu.service.';
import { NzModalService } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [
    ProfileComponent,
    UserAddressesComponent,
    UserHomeComponent,
    ProfileMenuComponent,
    ProfileBreadcrumbComponent,
    UserInfoComponent,
    UserPasswordComponent,
    OrderListComponent
  ],
  providers: [OrderService, MenuService, NzModalService]
})
export class ProfileModule { }
