import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
    {
        path: 'eating', 
        component: OrderComponent,
        children:[
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
    providers: []  //添加路由守卫时需要将守卫服务添加到providers中
})

export class OrderRoutingModule{

}