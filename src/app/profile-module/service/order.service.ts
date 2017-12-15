import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ResultMessage } from '../../models/ResultMessage';

@Injectable()
export class OrderService {
    // private baseUrl = 'https://easy-mock.com/mock/5a279c9967fd7c19aa08e508';
    private baseUrl = '/eating/order';

    //获取商店列表的接口URL
    private getOrderListUrl = this.baseUrl + '/getOrderList';
    private cancelOrderUrl = this.baseUrl + '/cancelOrder';

    //在此声明需要使用的内置对象，框架会自动注入
    constructor(
        private http: Http
    ) { }

    //编写获取数据的方法
    getOrderList(searchType: number, pageIndex: number): Promise<ResultMessage> {
        
        if(searchType == 0){
            searchType == null;
        }else{
            searchType--;//减1是因为订单状态和index正好差值为1，请参见../profile.component.ts文件中关于订单状态的说明
        }
        const body = {
            "pageinfovo":{
                "size":"6",
                "indexPageNum":pageIndex,
                "sortFieldNme":"orderid",
                "order":true
            },
            "order":{
                "status":searchType
            }
        }
        return this.http
            .post(this.getOrderListUrl,body)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError);
    }


    cancelOrder(ordernum:String): Promise<ResultMessage> {
        const body = {
            "order":{
                "ordernum":ordernum
            }
        }
        return this.http
            .post(this.cancelOrderUrl,body)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError);
    }










    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }
}
