import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { AppComponent } from './app.component';

//导入根路由模块
import { AppRoutingModule } from './app-routing.module';

//导入core模块，其中包括了服务
import { CoreModule } from './core-module/core-module.module';

//导入模块，子模块要在AppRoutingModule之前import，因为这样子路由才不会被默认路由和通配路由覆盖
import { OrderModule } from './order-module/order.module';
import { LoginModule } from './login-module/login.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    LoginModule,
    OrderModule,
    AppRoutingModule, //根路由模块要放在子路由模块后面
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
