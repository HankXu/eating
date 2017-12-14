import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { read } from 'fs';
import { Shop } from '../../models/Shop';
import { ResultMessage } from '../../models/ResultMessage';

@Injectable()
export class ShopListService {
    private baseUrl = 'https://easy-mock.com/mock/59edac831243b440c293a4cc/fortnight_ajax';

    private ipLocaUrl = 'http://api.map.baidu.com/location/ip?ak=09fjlm9Bgk7HMuaGCuDQgyTlfXQw5F3u';

    //根据ip地址定位城市的接口URL
    private ipLocaUrlDev = '/eating/shopping/ipLocation';

    //获取商店列表的接口URL
    private getShopListUrl = '/eating/shopping/getNearbyShop';

    //在此声明需要使用的内置对象，框架会自动注入
    constructor(
        private http: Http
    ) { }

    //通过ip定位
    getIpLocation(): Promise<string> {
        return this.http
            .post(this.ipLocaUrlDev,null)
            .toPromise()
            .then(reponse => {
                let res = reponse.json() as ResultMessage;
                console.log(res);
                if (res.serviceResult !== 1) {
                    return this.handleError("定位失败");
                }
                console.log(res.resultParm.city);
                return res.resultParm.city;
            })
            .catch(this.handleError);
    }

    //编写获取数据的方法
    getShopList(city: string, address: string): Promise<Shop[]> {

        let data = {
            city,
            address
        }

        return this.http
            .post(this.getShopListUrl, data)
            .toPromise()
            .then(response => {
                let res = response.json() as ResultMessage;
                if(res.serviceResult !== 1){
                    if(res.serviceResult === 3002){
                        return this.handleError(res.serviceResult);
                    }
                    return this.handleError(res.resultInfo);
                }
                return res.resultParm.shops;
            })
            .catch(this.handleError)    
    }

    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }

}