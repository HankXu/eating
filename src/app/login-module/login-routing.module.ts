import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

//定义路由对象数组
const routes: Routes  = [
    {
        path: 'login',
        component: LoginComponent
      },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
    providers: []
})

export class LoginRoutingModule{

}