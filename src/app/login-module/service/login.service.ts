import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// models
import { ResultMessage } from '../../models/ResultMessage';
import { Userkey } from '../../models/Userkey';

@Injectable()
export class LoginService {
    // baseUrl
    private baseUrl = '/eating/';

    // 构造器
    constructor(
        private http: Http
    ) { }

    // 获取验证码
    isLogin(): Promise<ResultMessage> {
        let url = this.baseUrl + "isLogin";
        
        return this.http
            .post(url, null)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 获取验证码
    getValidCode(phone: string): Promise<ResultMessage> {
        let url = this.baseUrl + "userkey/getValidCode";
        let userkey = new Userkey();
        userkey.loginmsg = phone;
        let data = {
            userkey: userkey
        }
        return this.http
            .post(url, data)
            .toPromise()
            .then(response => response.json() as ResultMessage)
            .catch(this.handleError)
    }

    // 验证码登录
    messageLogin(phone: string, validCode: string): Promise<ResultMessage> {
        let url = this.baseUrl + "userkey/messageLogin";
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
        let url = this.baseUrl + "userkey/passwordLogin";
        let userkey = new Userkey();
        userkey.loginmsg = phone;
        userkey.credential = password;
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