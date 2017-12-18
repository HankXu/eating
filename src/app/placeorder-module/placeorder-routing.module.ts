import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCreateorderComponent } from './components/order-createorder/order-createorder.component';
import { PlaceorderComponent } from './placeorder.component';

const routes: Routes = [
    {
        path: 'placeorder', 
        component: PlaceorderComponent,
        children:[
            {
                path: 'checkout',
                component: OrderCreateorderComponent
            },
            
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
    providers: []  //添加路由守卫时需要将守卫服务添加到providers中
})

export class PlaceorderRoutingModule{

}