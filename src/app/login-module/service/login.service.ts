import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Md5 } from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';

// models
import { ResultMessage } from '../../models/ResultMessage';
import { Userkey } from '../../models/Userkey';

@Injectable()
export class LoginService {
    // baseUrl
    private baseUrl = '/eating/userkey/';

    // 构造器
    constructor(
        private http: Http
    ) { }

    // 验证码登录
    messageLogin(phone: string, validCode: string): Promise<ResultMessage> {
        let url = this.baseUrl + "messageLogin";
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

    // 密码登录
    passwordLogin(phone: string, password: string): Promise<ResultMessage> {
        let url = this.baseUrl + "passwordLogin";
        let userkey = new Userkey();
        userkey.loginmsg = phone;
        userkey.credential =  Md5.hashStr(password).toString();
        let data = {
            userkey: userkey
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

}