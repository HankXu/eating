import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Md5 } from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';

// models
import { ResultMessage } from '../../models/ResultMessage';
import { Userinfo } from '../../models/Userinfo';
import { Userkey } from '../../models/Userkey';

@Injectable()
export class UserinfoService {

    // baseUrl
    private baseUrl = '/eating/';

    // 构造器
    constructor(
        private http: Http
    ) { }

    // 修改密码
    editPassowrd(oldPassword: string, newPassword: string): Promise<ResultMessage> {

        let url = this.baseUrl + "userkey/editPassword";

        let data = {
            newPassword: Md5.hashStr(newPassword).toString()
        }

        if (oldPassword !== '') {
            data['oldPassword'] = Md5.hashStr(oldPassword).toString();
        }

        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 修改用户名
    editUsername(userinfoid: number, username: string): Promise<ResultMessage> {

        let url = this.baseUrl + "userinfo/editUsername";

        let userinfo = new Userinfo();
        userinfo.userinfoid = userinfoid;
        userinfo.username = username;

        let data = {
            userinfo: userinfo
        }

        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 修改手机号
    editPhone(phone: string, validCode: string): Promise<ResultMessage> {

        let url = this.baseUrl + "userkey/editPhone";

        let userkey = new Userkey();
        userkey.loginmsg = phone;

        let data = {
            userkey: userkey,
            validCode: validCode
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