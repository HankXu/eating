import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { OrderRoutingModule } from './order-routing.module';

import { HomeComponent } from './components/home/home.component';
import { EFooterComponent } from './components/e-footer/e-footer.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [
    OrderComponent,
    NavigationComponent,
    HomeComponent,
    EFooterComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  providers: []
})
export class OrderModule { }
