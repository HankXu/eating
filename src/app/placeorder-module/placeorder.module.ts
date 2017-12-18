import { NgModule  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


//引入组件库
import { NgZorroAntdModule } from 'ng-zorro-antd';

//引入共享的模块
import { SharedModule } from '../shared-module/shared-module.module';

//导入本模块的路由模块
import { PlaceorderRoutingModule } from './placeorder-routing.module';

//导入自定义的组件
import { PlaceorderComponent } from './placeorder.component';
import { OrderCreateorderComponent } from './components/order-createorder/order-createorder.component';


@NgModule({
    declarations: [
      PlaceorderComponent,
      OrderCreateorderComponent,
    ],
    imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      PlaceorderRoutingModule,
      NgZorroAntdModule,
      SharedModule,
    ],
    providers: [
    //   ShopListService, //这是订餐模块内部使用的服务
    //   OrderService,
    //   NearbyAddressService
    ]
  })
export class PlaceOrderModule {}