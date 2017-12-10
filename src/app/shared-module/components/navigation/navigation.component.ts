import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core-module/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  isLogin: boolean;

  userfaceimg: string;
  username: string;

  // 构造器
  constructor(
    private authService: AuthService
  ) { }

  // 初始化  
  ngOnInit() {
    this.userfaceimg = '';
    this.username = '';
    this.isLogin = false;

    this.reqIsLogin();
  }

  // 请求登录状态
  reqIsLogin() {
    this.authService.reqIsLogin().then(
      resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            if (resultMessage.resultParm.isLogin) {
              this.isLogin = true;
              this.getUserinfo();
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    );
  }

  // 获取用户信息
  getUserinfo() {
    this.authService.getUserinfo().then(
      userinfo => {
        if (userinfo != null) {
          this.username = userinfo.username;
          if (userinfo.faceimg == null) {
            this.userfaceimg = '';
          } else {
            this.userfaceimg = 'http://localhost/eating/update/userfaceimg/' + userinfo.faceimg;
          }
        }
      }
    );
  }

  // 用户登出
  logout() {
    this.authService.logout().then(
      resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
              this.userfaceimg = '';
              this.username = '';
              this.isLogin = false;
            break;
          }
          default: {
            break;
          }
        }
      }
    );
  }

}
