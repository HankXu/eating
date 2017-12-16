import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { read } from 'fs';

import { ResultMessage } from '../../models/ResultMessage';
import { Useraddress } from '../../models/Useraddress';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class NearbyAddressService {

    private baseUrl = "/eating-user/";

    //根据输入的部分地址查找附近地点的接口
    private nearbyAddressUrl = "userAddress/getNearbyAddress";

    constructor(
        private http: Http,
    ) { }

    // 获取附近的地址
    getNearbyAddress(address: string, geohash: string): Promise<ResultMessage> {

        let userAddressPo = new Useraddress();
        userAddressPo.geoname = address;
        userAddressPo.geohash = geohash;

        let data = {
            userAddress: userAddressPo
        }

        return this.http
            .post(this.baseUrl + this.nearbyAddressUrl, data)
            .toPromise()
            .then(
                response => response.json() as ResultMessage
            )
            .catch(
                error => this.handleError(error)
            )
    }

    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }

}