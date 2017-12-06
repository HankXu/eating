import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//引入组件库，在子模块中引入后，在imports数组填NgZorroAntdModule，在根模块引入则需要加入跟上“.forRoot()”
import { NgZorroAntdModule } from 'ng-zorro-antd';

//引入自定义组件
import { LoginComponent } from './login.component';

//引入路由子模块
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
    declarations: [
      LoginComponent,
    ],
    imports: [
      BrowserAnimationsModule, 
      FormsModule,
      ReactiveFormsModule,
      LoginRoutingModule,
      NgZorroAntdModule
    ],
    providers: [],
  })

export class LoginModule {}