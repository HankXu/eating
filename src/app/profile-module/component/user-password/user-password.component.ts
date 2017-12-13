import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { MenuService } from '../../service/menu.service.';
import { UserinfoService } from '../../service/userinfo.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(
    private menuService: MenuService,
    private userinfoService: UserinfoService,
    private _message: NzMessageService,
  ) { }

  ngOnInit() {
    this.menuService.currentMenu(3);
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  editPassowrd() {
    if (this.newPassword === '') {
      this.createMessage('warning', '请输入新密码');
    } else if (this.confirmPassword === '') {
      this.createMessage('warning', '请输入确认密码');
    } else if (this.confirmPassword != this.newPassword) {
      this.createMessage('warning', '确认密码不正确');
    } else {
      this.userinfoService.editPassowrd(this.oldPassword, this.newPassword).then(
        resultMessage => {
          let resultCode = resultMessage.serviceResult;
          switch (resultCode) {
            case 1: {
              this.createMessage('success', '修改密码成功');
              break;
            }
            case 1008: {
              this.createMessage('warning', '请输入正确的密码格式');
              break;
            }
            case 1011: {
              this.createMessage('warning', '旧密码验证错误');
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
          this.createMessage('error', '网络环境差.');
        }
      );
    }

  }

  // Message全局提示
  createMessage = (type, text) => {
    this._message.create(type, text);
  };


}
