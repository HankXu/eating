import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//引入组件库
import { NgZorroAntdModule } from 'ng-zorro-antd';

//导入子路由模块
import { ShopRoutingModule } from './shop-routing.module';

//引入共享的模块
import { SharedModule } from '../shared-module/shared-module.module';

import { ShopComponent }  from './shop.component';
import { ShopInfoBarComponent } from './components/shop-info-bar/shop-info-bar.component';
import { ShopSubNavComponent } from './components/shop-sub-nav/shop-sub-nav.component';
import { GoodsCategoryListComponent } from './components/goods-category-list/goods-category-list.component';
import { AllGoodsListComponent } from './components/all-goods-list/all-goods-list.component';
import { CharacteristicGoodsListComponent } from './components/characteristic-goods-list/characteristic-goods-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { QualifiInfoComponent } from './components/qualifi-info/qualifi-info.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ShopRoutingModule,
    SharedModule,
    NgZorroAntdModule,
  ],
  declarations: [
    ShopComponent,
    ShopSubNavComponent,
    GoodsCategoryListComponent,
    AllGoodsListComponent,
    CharacteristicGoodsListComponent,
    ShoppingCartComponent,
    QualifiInfoComponent,
    ShopInfoBarComponent
  ],
})
export class ShopModule { }
