import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserAddressesComponent } from './component/user-addresses/user-addresses.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { UserPasswordComponent } from './component/user-password/user-password.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'userinfo', component: UserInfoComponent },
      { path: 'addresses', component: UserAddressesComponent },
      { path: 'password', component: UserPasswordComponent },
      { path: 'orders/:searchType', component: OrderListComponent },
      { path: 'orderdetail/:orderid', component: OrderDetailComponent },
      { path: '', component: UserHomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
