import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order-module/order.component';
import { LoginComponent } from './login-module/login.component';
import { ShopComponent } from './shop-module/shop.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'shop/:id',component: ShopComponent},
    {path: '', redirectTo: '/eating', pathMatch: 'full'},
    {path: '**', redirectTo: '/eating', pathMatch: 'full'}
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(
            routes,
            { enableTracing: true } // <-- debugging purposes only
    )],
    exports: [ RouterModule ],
    providers: []  //添加路由守卫时需要将守卫服务添加到providers中
})

export class AppRoutingModule{

}