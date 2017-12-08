import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { UserAddressesComponent } from './component/user-addresses/user-addresses.component';
import { UserHomeComponent } from './component/user-home/user-home.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgZorroAntdModule,
  ],
  declarations: [
    ProfileComponent,
    UserAddressesComponent,
    UserHomeComponent
  ]
})
export class ProfileModule { }
