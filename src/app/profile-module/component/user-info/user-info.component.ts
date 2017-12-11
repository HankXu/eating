import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';
import { AuthService } from '../../../core-module/service/auth.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  username: string;
  newUsername: string;

  userfaceimg: string;
  newUserfaceimg: string;

  phone: string;
  newPhone: string;
  validCode: string;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.menuService.currentMenu(1);
    this.recieveAnnounce();
    this.authService.getUserinfo();
  }

  showModal(titleTpl, contentTpl) {
    const modal = this.modalService.open({
      title: titleTpl,
      content: contentTpl,
      closable: true,
      showConfirmLoading: true,
      onOk: () => {
        switch (titleTpl) {
          case '修改头像': {
            let faceimgName = this.newUserfaceimg.substring(this.newUserfaceimg.lastIndexOf('/') + 1);
            console.log("new faceimgName: " + faceimgName);
            break;
          }
          case '修改手机号': {
            console.log("new phone: " + this.newPhone);
            break;
          }
          case '修改用户名': {
            console.log("new username: " + this.newUsername);
            break;
          }
        }
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      },
      onCancel: () => {
      }
    });
  }

  getValidCode() {
    console.log("获取验证码: " + this.newPhone);
  }

  // 定义通知
  recieveAnnounce() {
    // 接收通知
    this.authService.reqUserinfo$.subscribe(userInfo => {
      if (userInfo != null) {
        this.username = userInfo.username;
        this.newUsername = userInfo.username;
        this.phone = userInfo.phone;
        this.newPhone = userInfo.phone;
        if (userInfo.faceimg == null) {
          this.userfaceimg = '';
        } else {
          this.userfaceimg = 'http://localhost/eating/update/userfaceimg/' + userInfo.faceimg;
        }
        this.newUserfaceimg = this.userfaceimg;
      }
    });
  }

}
