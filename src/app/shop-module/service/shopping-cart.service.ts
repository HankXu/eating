import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Goods } from '../../models/Goods';

@Injectable()
export class ShoppingCartService{

    //选择商品的数据源
    private selectedGoodsSource = new Subject<Goods>();

    //转化为被观察对象
    selectedGoods$ = this.selectedGoodsSource.asObservable();

    //触发数据发射
    announceCurrentSelected(goods: Goods) {
        this.selectedGoodsSource.next(goods);
    }

}