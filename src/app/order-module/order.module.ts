import { NgModule  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


//引入组件库
import { NgZorroAntdModule } from 'ng-zorro-antd';

//导入本模块的路由模块
import { OrderRoutingModule } from './order-routing.module';

//导入自定义的组件
import { OrderComponent } from './order.component';
import { HomeComponent } from './components/home/home.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';

//引入共享的模块
import { SharedModule } from '../shared-module/shared-module.module';

//引入模块内部使用的service
import { ShopListService } from './service/shop-list.service';
import { OrderService } from './service/order.service';


import { FileUploadModule } from 'ng2-file-upload';
import { NearbyAddressService } from './service/nearby-address.service';


@NgModule({
  declarations: [
    OrderComponent,
    HomeComponent,
    ShopListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRoutingModule,
    NgZorroAntdModule,
    SharedModule,
    FileUploadModule
  ],
  providers: [
    ShopListService, //这是订餐模块内部使用的服务
    OrderService,
    NearbyAddressService
  ]
})
export class OrderModule { }
