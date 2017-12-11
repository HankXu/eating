import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Md5 } from "ts-md5/dist/md5";

import { NzMessageService } from 'ng-zorro-antd';
// http请求服务
import { LoginService } from './service/login.service';
import { AuthService } from '../core-module/service/auth.service';



const phoneRegex = /^(13\d{9}$)|(15[0,1,2,3,5,6,7,8,9]\d{8}$)|(18[0,2,5,6,7,8,9]\d{8}$)|(147\d{8})$/;
const passwordRegex = /^.{6,16}$/;
const validCodeRegex = /^\d{4}$/;

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    // 按钮状态
    isLogining: boolean;
    isDisable: boolean;

    // 表单双向绑定
    phoneNum: string;
    validCode: string;
    password: string;

    // 验证码定时
    validCodeMessage: string;
    time: number;
    timer;

    // 构造器
    constructor(
        private location: Location,
        private _message: NzMessageService,
        private router: Router,
        private loginService: LoginService,
        private authService: AuthService
    ) { }

    // 初始化
    ngOnInit() {
        this.isLogining = false;
        this.isDisable = true;
        this.validCodeMessage = '获取验证码';

        // 表单初始化
        this.phoneNum = '';
        this.validCode = '';
        this.password = '';

        this.isLogin();
    };

    //验证码按钮状态
    phoneNumChange() {
        if (phoneRegex.test(this.phoneNum)) {
            this.isDisable = false;
        } else {
            this.isDisable = true;
        }
    };

    // 是否已登录
    isLogin() {
        this.authService.reqIsLogin().then(
            resultMessage => {
                let resultCode = resultMessage.serviceResult;
                switch (resultCode) {
                    case 1: {
                        if (resultMessage.resultParm.isLogin == true) {
                            console.log("login");
                            this.router.navigate(['/home']);
                        }
                        break;
                    }
                    default: {
                        //其他错误
                        this.createMessage('error', '服务器繁忙, 请稍后再试.');
                        break;
                    }
                }
            },
            error => {
                console.log("网络环境差")
            }
        );
    }

    // 获取验证码
    getValidCode() {
        //获取验证码
        if (!this.isDisable) {
            this.isDisable = true;
            this.time = 59;
            this.validCodeMessage = `已发送(${this.time}s)`;
            this.timer = setInterval(() => {
                this.time--;
                this.validCodeMessage = `已发送(${this.time}s)`;
                if (this.time === 0) {
                    this.validCodeMessage = '重新获取';
                    this.isDisable = false;
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }, 1000);

            this.loginService.getValidCode(this.phoneNum).then(
                resultMessage => {
                    let resultCode = resultMessage.serviceResult;
                    switch (resultCode) {
                        case 1: {
                            //验证码发送成功
                            this.createMessage('success', '验证码发送成功');
                            break;
                        }
                        case 1007: {
                            //手机格式不正确
                            this.createMessage('warning', '请输入正确的手机号码');
                            break;
                        }
                        default: {
                            //其他错误
                            this.createMessage('error', '服务器繁忙, 请稍后再试.');
                            break;
                        }
                    }
                },
                error => {
                    this.createMessage('error', '服务器繁忙, 请稍后再试.');
                }
            );
        }
    };

    // 验证码登录
    messageLogin() {
        //字段校验
        if (!phoneRegex.test(this.phoneNum)) {
            this.createMessage('warning', '请输入正确的手机号码');
        } else if (!validCodeRegex.test(this.validCode)) {
            this.createMessage('warning', '请输入有效的验证码');
        } else {
            if (!this.isLogining) {
                this.isLogining = true;

                //登录请求
                this.loginService.messageLogin(this.phoneNum, this.validCode).then(
                    resultMessage => {
                        let resultCode = resultMessage.serviceResult;
                        switch (resultCode) {
                            case 1: {
                                //登录成功
                                this.createMessage('success', '登录成功');
                                this.goBack();
                                break;
                            }
                            case 1006: {
                                //验证码有误
                                this.createMessage('warning', '请输入正确的验证码');
                                break;
                            }
                            case 1007: case 1005: {
                                //手机格式不正确 //手机号码有误
                                this.createMessage('warning', '请输入正确的手机号码');
                                break;
                            }
                            case 1004: {
                                //验证码过期
                                this.createMessage('warning', '验证码已过期, 请重新获取');
                                break;
                            }
                            default: {
                                //其他错误
                                this.createMessage('error', '服务器繁忙, 请稍后再试.');
                                break;
                            }
                        }
                        this.isLogining = false;
                    },
                    error => {
                        this.isLogining = false;
                        this.createMessage('error', '服务器繁忙, 请稍后再试.');
                    }
                );
            }
        }
    };

    // 密码登录
    passwordLogin() {
        //字段校验
        if (!phoneRegex.test(this.phoneNum)) {
            this.createMessage('warning', '请输入正确的手机号码');
        } else if (!passwordRegex.test(this.password)) {
            this.createMessage('warning', '请输入6-16位的密码');
        } else {
            if (!this.isLogining) {
                this.isLogining = true;

                //登录请求
                this.loginService.passwordLogin(this.phoneNum, Md5.hashStr(this.password).toString()).then(
                    resultMessage => {
                        let resultCode = resultMessage.serviceResult;
                        switch (resultCode) {
                            case 1: {
                                //登录成功
                                this.createMessage('success', '登录成功');
                                this.goBack();
                                break;
                            }
                            case 102: {
                                //用户名不存在
                                this.createMessage('warning', '用户名不存在');
                                break;
                            }
                            case 103: case 1008: {
                                //验证信息错误 / 密码长度不正确
                                this.createMessage('warning', '密码不正确');
                                break;
                            }
                            case 1007: {
                                //手机格式不正确
                                this.createMessage('warning', '请输入正确的手机号码');
                                break;
                            }
                            default: {
                                //其他错误
                                this.createMessage('error', '服务器繁忙, 请稍后再试.');
                                break;
                            }
                        }
                        this.isLogining = false;
                    },
                    error => {
                        this.isLogining = false;
                        this.createMessage('error', '服务器繁忙, 请稍后再试.');
                    }
                );
            }
        }
    };

    // Message全局提示
    createMessage = (type, text) => {
        this._message.create(type, text);
    };

    // 返回上一个页面
    goBack(): void {
        this.location.back();
    };

    // 清除工作
    ngOnDestroy() {
        if (this.timer != null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
}