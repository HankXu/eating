import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ShopComponent } from './shop.component';
import { AllGoodsListComponent } from './components/all-goods-list/all-goods-list.component';
import { QualifiInfoComponent } from './components/qualifi-info/qualifi-info.component';

const routes: Routes = [
    { 
        path: 'shop/:id',
        component: ShopComponent,
        children: [
            {path: 'qulifi', component: QualifiInfoComponent},
            {path: 'goods', component: AllGoodsListComponent},
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