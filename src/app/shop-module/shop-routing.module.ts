import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ShopComponent } from './shop.component';
import { AllGoodsListComponent } from './components/all-goods-list/all-goods-list.component';

const routes: Routes = [
    { 
        path: 'shop/:id',
        component: ShopComponent,
        children: [
            {path: '' , component: AllGoodsListComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class ShopRoutingModule{

}