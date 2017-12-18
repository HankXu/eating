import { Injectable, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InnerCartGoods } from '../../models/InnerCartGoods';
import { PlaceOrderInfo } from '../../models/PlaceOrderInfo';

@Injectable()
export class PlaceOrderService {
    
    //选择商品的数据源
    private placeOrderSource = new BehaviorSubject<PlaceOrderInfo>(new PlaceOrderInfo());
    
        //转化为被观察对象
        placeOrderSource$ = this.placeOrderSource.asObservable();
    
        //触发数据发射
        announcePlaceOrderInfo(orderInfo: PlaceOrderInfo) {
            this.placeOrderSource.next(orderInfo);
        }
}