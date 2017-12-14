import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import { Goods } from '../../models/Goods';
import { GroupedGoods } from '../../models/GroupedGoods';
import { ResultMessage } from '../../models/ResultMessage';
import { Shop } from '../../models/Shop';

@Injectable()
export class ShopService{

    private shopInfo = new Subject<Shop>();
    private groupedGoods = new Subject<GroupedGoods[]>();

    shopInfo$ = this.shopInfo.asObservable();
    groupedGoods$ = this.groupedGoods.asObservable();

    //定义错误处理数据源
    private shop_error = new Subject();

    shop_error$ = this.shop_error.asObservable();

    getGoodsInShopUrl: string  = '/eating/shopping/getGoodsInShop';
    getShopInfoUrl: string = '/eating/shopping/getShopInfo';

    constructor(
        private http: Http
    ){}

    getGoodsInShop(id: number) {
        let data = {
            shopVo: {
                shopid: id
            }
        }
        return this.http
                .post(this.getGoodsInShopUrl, data)
                .subscribe(
                    response => {
                        let res = response.json() as ResultMessage;
                        if(res.serviceResult !== 1){
                            return this.shop_error.next(res.resultInfo);
                        }
                        console.log(res.resultParm.goods);
                        this.groupedGoods.next(res.resultParm.goods);
                    },
                    error => {
                        this.shop_error.next(error);
                    }
                )
    }

    getShopInfo(id: number) {
        let data = {
            shopVo: {
                shopid: id
            }
        }

        this.http
        .post(this.getShopInfoUrl, data)
        .subscribe(
            response => {
                let res = response.json() as ResultMessage;
                if(res.serviceResult !== 1){
                    console.log(res.resultInfo);
                    return this.shop_error.next(res.resultInfo);
                }
                console.log(res.resultParm.shopinfo);
                this.shopInfo.next(res.resultParm.shopinfo)
            },
            error => {
                this.shop_error.next(error);
            }
        )

        // .then(response => {
        //     let res = response.json() as ResultMessage;
        //     if(res.serviceResult !== 1){
        //         return this.handleError(res.resultInfo);
        //     }
        //     console.log(res.resultParm.shopinfo);
        //     return res.resultParm.shopinfo;
        // })
        // .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }
}