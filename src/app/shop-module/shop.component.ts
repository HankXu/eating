import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ShoppingCartService } from './service/shopping-cart.service';
import { ShopService } from './service/shop.service';

import { Shop } from '../models/Shop';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css'],
    providers: [ShoppingCartService]
})

export class ShopComponent implements OnInit{

    selectedGoods = {};

    shopInfo: Shop = new Shop();
    private subscription_shopinfo: Subscription;
    private subscription_error: Subscription;

    constructor(
        private shopService: ShopService,
        private _message: NzMessageService,
        private activatedRoute: ActivatedRoute,
    ){}

    dataSubject() :void {
        this.subscription_shopinfo = this.shopService
                                        .shopInfo$
                                        .subscribe(
                                            shopinfo => this.shopInfo = shopinfo
                                        )  //订阅info数据源
        this.subscription_error = this.shopService
                                     .shop_error$
                                     .subscribe(
                                         error => {
                                            this._message.create('error',`${error}，请重试`)
                                         }
                                     )
        
    }
    ngOnInit(){
        this.dataSubject();
        this.activatedRoute.params.subscribe(
            params => {
                this.shopService.getShopInfo(+params.id);
            });
    }
}