import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

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
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { OrderCreateorderComponent } from './component/order-createorder/order-createorder.component';
import { OrderService } from './service/order.service';
import { MenuService } from './service/menu.service.';
import { NzModalService } from 'ng-zorro-antd';
import { UserinfoService } from './service/userinfo.service';
import { UseraddressService } from './service/useraddress.service';

import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    FormsModule,
    FileUploadModule
  ],
  declarations: [
    ProfileComponent,
    UserAddressesComponent,
    UserHomeComponent,
    ProfileMenuComponent,
    ProfileBreadcrumbComponent,
    UserInfoComponent,
    UserPasswordComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderCreateorderComponent
  ],
  providers: [NzMessageService, OrderService, MenuService, NzModalService, UserinfoService, UseraddressService]
})
export class ProfileModule { }
