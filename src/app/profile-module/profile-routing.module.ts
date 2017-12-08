import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserAddressesComponent } from './component/user-addresses/user-addresses.component';
import { UserHomeComponent } from './component/user-home/user-home.component';

const routes: Routes = [
  { 
    path: 'profile',
    component: ProfileComponent,
    children: [
        {path: 'addresses' , component: UserAddressesComponent},
        {path: '' , component: UserHomeComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
