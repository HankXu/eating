import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
    private baseUrl = 'https://easy-mock.com/mock/5a279c9967fd7c19aa08e508';

    //获取商店列表的接口URL
    private getOrderListUrl = this.baseUrl + '/order/orderList';

    //在此声明需要使用的内置对象，框架会自动注入
    constructor(
        private http: Http
    ) { }

    //编写获取数据的方法
    getOrderList(searchType: number, pageIndex: number): Promise<object[]> {

        return this.http
            .get(this.getOrderListUrl)
            .toPromise()
            .then(
            response => {
                let tmporders = response.json().data as object[];
                let orders = [];
                orders = orders.concat(tmporders, tmporders, tmporders);
                return orders;
            }).catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }
}
