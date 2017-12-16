import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Md5 } from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';

// models
import { ResultMessage } from '../../models/ResultMessage';
import { Useraddress } from '../../models/Useraddress';

@Injectable()
export class UseraddressService {

    // baseUrl
    private baseUrl = '/eating-user/userAddress/';

    // 构造器
    constructor(
        private http: Http
    ) { }

    // 获取用户地址列表
    getUserAddressList(): Promise<ResultMessage> {
        let url = this.baseUrl + "getUserAddressList";

        return this.http
            .post(url, null)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 添加用户收货地址
    addUserAddress(userAddress: Useraddress): Promise<ResultMessage> {

        let url = this.baseUrl + "addUserAddress";

        let userAddressPo = new Useraddress();
        userAddressPo.fullname = userAddress.fullname;
        userAddressPo.phone = userAddress.phone;
        userAddressPo.address = userAddress.address;

        userAddressPo.geoname = userAddress.geoname;
        userAddressPo.geohash = userAddress.geohash;

        let data = {
            userAddress: userAddressPo
        }

        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 获取用户收货地址
    getUserAddress(useraddressid: number): Promise<ResultMessage> {

        let url = this.baseUrl + "getUserAddress";

        let userAddressPo = new Useraddress();
        userAddressPo.useraddressid = useraddressid;

        let data = {
            userAddress: userAddressPo
        }

        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 修改用户收货地址
    editUserAddress(userAddress: Useraddress): Promise<ResultMessage> {

        let url = this.baseUrl + "editUserAddress";

        let userAddressPo = new Useraddress();
        userAddressPo.useraddressid = userAddress.useraddressid;
        userAddressPo.fullname = userAddress.fullname;
        userAddressPo.phone = userAddress.phone;
        userAddressPo.address = userAddress.address;

        userAddressPo.geoname = userAddress.geoname;
        userAddressPo.geohash = userAddress.geohash;

        let data = {
            userAddress: userAddressPo
        }

        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 删除用户收货地址
    removeUserAddress(useraddressid: number): Promise<ResultMessage> {

        let url = this.baseUrl + "removeUserAddress";

        let userAddressPo = new Useraddress();
        userAddressPo.useraddressid = useraddressid;

        let data = {
            userAddress: userAddressPo
        }

        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 获取附近的地址
    getNearbyAddress(geoname: string, geohash: string): Promise<ResultMessage> {

        let url = this.baseUrl + "getNearbyAddress";

        let userAddressPo = new Useraddress();
        userAddressPo.geoname = geoname;
        userAddressPo.geohash = geohash;

        let data = {
            userAddress: userAddressPo
        }

        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }

};