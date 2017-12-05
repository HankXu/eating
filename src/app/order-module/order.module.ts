import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { OrderComponent } from './order.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { OrderRoutingModule } from './order-routing.module';

import { HomeComponent } from './components/home/home.component';
import { EFooterComponent } from './components/e-footer/e-footer.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ShopLsitComponent } from './components/shop-lsit/shop-lsit.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';


@NgModule({
  declarations: [
    OrderComponent,
    NavigationComponent,
    HomeComponent,
    EFooterComponent,
    ShopLsitComponent,
    ProfileMenuComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpModule
  ],
  providers: []
})
export class OrderModule { }
