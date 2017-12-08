import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core-module/service/auth.service';
import { ResultMessage } from '../../../models/ResultMessage';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  isLogin: boolean;

  userfaceimg: string;
  username: string;

  constructor(
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.userfaceimg = '';//http://wx.qlogo.cn/mmopen/j8JSzC6ialBYOVT8icHcNvt8rfjK4QPzvFLcOF07uiaClDPUTGPXJnZMOdsYCibZE24IBU4ibGTeiaicde3oJylc9L0pfwU7tiaURVJ9/0
    this.username = '';
    this.isLogin = false;

    this.reqIsLogin();
  }

  reqIsLogin() {
    this.authService.reqIsLogin().then(
      resultMessage => {
        console.log("nav--------reqIsLogin()");
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

  getUserinfo() {
    this.authService.getUserinfo().then(
      userinfo => {
        console.log("nav--------getUserinfo()");
        if (userinfo != null) {
          this.username = userinfo.username;
          this.userfaceimg = userinfo.faceimg;
        }
      }
    );
  }


}
