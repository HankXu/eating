import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

// models
import { ResultMessage } from '../../models/ResultMessage';
import { Userinfo } from '../../models/Userinfo';
import { Userkey } from '../../models/Userkey';

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

    // 登录请求的观察者
    private reqIsloginComplete = new Subject<boolean>();
    reqIslogin$ = this.reqIsloginComplete.asObservable();

    setIsLogin(isLogin: boolean) {
        this.reqIsloginComplete.next(isLogin);
    }

    getIsLogin() {
        this.setIsLogin(this.logining);
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
                let resultCode = resultMessage.serviceResult;
                switch (resultCode) {
                    case 1: {
                        this.logining = resultMessage.resultParm.isLogin;
                        // 通知登录状态
                        this.setIsLogin(this.logining);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return resultMessage;
            }).catch(this.handleError)
    }

    // 用户信息请求的观察者
    private reqUserinfoComplete = new Subject<Userinfo>();
    reqUserinfo$ = this.reqUserinfoComplete.asObservable();

    setUserinfo(userinfo: Userinfo) {
        this.reqUserinfoComplete.next(userinfo);
    }

    getUserinfo() {
        if (this.logining) {
            if (this.userinfo == null) {
                //请求用户信息
                this.reqUserinfo().then(resultMessage => this.userinfo);
            } else {
                this.setUserinfo(this.userinfo);
            }
        } else {
            //用户未登录
            this.setUserinfo(null);
        }
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
                let resultCode = resultMessage.serviceResult;
                switch (resultCode) {
                    case 1: {
                        this.userinfo = new Userinfo();
                        this.userinfo.username = resultMessage.resultParm.userinfo.username;
                        this.userinfo.faceimg = resultMessage.resultParm.userinfo.faceimg;
                        this.userinfo.phone = resultMessage.resultParm.phone;
                        this.setUserinfo(this.userinfo);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return resultMessage;
            }).catch(this.handleError)
    }

    // 用户登出
    logout() {
        let url = this.baseUrl + "logout";
        return this.http
            .post(url, null)
            .toPromise()
            .then(
            response => {
                let resultMessage = response.json() as ResultMessage;
                if (resultMessage.serviceResult == 1) {
                    this.logining = false;
                    this.userinfo = null;
                }
                return resultMessage;
            }
            ).catch(this.handleError)
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

    private handleError(error: any): Promise<any> {
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }
}