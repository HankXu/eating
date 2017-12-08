import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

// models
import { ResultMessage } from '../../models/ResultMessage';
import { Userinfo } from '../../models/Userinfo';

@Injectable()
export class AuthService implements OnInit {

    // baseUrl
    private baseUrl = '/eating/';

    // 是否已登录 标记
    private logining: boolean;

    // 是否已登录 标记
    private userinfo: Userinfo;

    // 构造器
    constructor(
        private http: Http
    ) { }

    // 初始化
    ngOnInit() {
        this.logining = false;
        this.userinfo = null;
    }

    // 请求登录状态api (供登录界面和导航栏调用, 其他模块只需要调用 isLogin() 即可)
    reqIsLogin(): Promise<ResultMessage> {
        let url = this.baseUrl + "isLogin";

        return this.http
            .post(url, null)
            .toPromise()
            .then(
            response => {
                let resultMessage = response.json() as ResultMessage;
                this.logining = resultMessage.resultParm.isLogin;
                return resultMessage;
            }
            )
            .catch(this.handleError)
    }

    // 是否已登录
    isLogin(): boolean {
        return this.logining;
    }

    // 请求用户信息api (供用户信息模块调用, 其他模块只需要调用 getUserinfo() 即可)
    reqUserinfo(): Promise<ResultMessage> {
        let url = this.baseUrl + "userinfo/getUserinfo";

        return this.http
            .post(url, null)
            .toPromise()
            .then(
            response => {
                let resultMessage = response.json() as ResultMessage;
                this.userinfo = new Userinfo();
                this.userinfo.username = resultMessage.resultParm.userinfo.username;
                this.userinfo.faceimg = resultMessage.resultParm.userinfo.faceimg;
                this.userinfo.phone = resultMessage.resultParm.phone;
                return resultMessage;
            }
            ).catch(this.handleError)
    }

    // 获取用户信息
    getUserinfo() {
        return new Promise<Userinfo>(
            resolve => {
                let promise = null;
                console.log("ser--------if (userinfo != null) {if (this.logining) {");
                if (this.logining) {
                    console.log("ser--------if (this.userinfo == null) {");
                    if (this.userinfo == null) {
                        //请求用户信息
                        console.log("ser--------promise = this.reqUserinfo()");
                        promise = this.reqUserinfo().then(resultMessage => this.userinfo);
                    } else {
                        console.log("ser--------promise = new Promise<Userinfo>");
                        promise = new Promise<Userinfo>(resolve => resolve(this.userinfo));
                    }
                } else {
                    //用户未登录
                    console.log("ser--------//用户未登录");
                    this.userinfo = null;
                }
                resolve(promise);
            }
        )
    }

    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }
}