import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

//导入service
import { AuthService } from './service/auth.service'
import { PlaceOrderService } from './service/place-order.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: []
})

export class CoreModule {
  //将服务添加到这个forRoot方法返回的providers数组里，这样全局服务就不用再每个用到它的子模块的providers里都填一次
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,//新添加的服务就跟在后面就可以
        PlaceOrderService
      ]
    };
  }
}
