import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';
import { AuthService } from '../../../core-module/service/auth.service';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
// import { FileUploader } from 'ng2-file-upload';

import { Userinfo } from '../../../models/Userinfo';
import { UserinfoService } from '../../service/userinfo.service';

const phoneRegex = /^(13\d{9}$)|(15[0,1,2,3,5,6,7,8,9]\d{8}$)|(18[0,2,5,6,7,8,9]\d{8}$)|(147\d{8})$/;
const validCodeRegex = /^\d{4}$/;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userinfo: Userinfo
  newUsername: string;

  newUserfaceimg: string;

  newPhone: string;
  validCode: string;
  // 获取验证码按钮状态
  isDisable: boolean;
  // 倒计时
  time: number;
  // 按钮文字
  validCodeMessage: string;
  // 计时器
  timer;

  // 上传组件初始化
  // uploader: FileUploader;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private modalService: NzModalService,
    private _message: NzMessageService,
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    this.userinfo = new Userinfo();
    this.newUsername = '';
    this.newUserfaceimg = '';
    this.newPhone = '';
    this.validCode = '';

    this.validCodeMessage = '获取验证码';
    this.isDisable = true;

    this.menuService.currentMenu(1);
    this.reqUserinfo();

    // this.initUploadImg();

  }

  // initUploadImg() {
  //   this.uploader = new FileUploader({
  //     url: "/eating/uploadFile",
  //     method: "POST",
  //     itemAlias: "file",
  //     allowedFileType: ["image"],
  //     autoUpload: false
  //   });
  // }

  // selectedFileOnChanged() {
  //   // 这里是文件选择完成后的操作处理
  //   this.uploader.queue[0].onSuccess = (response, status, headers) => {
  //     // 上传文件成功   
  //     if (status == 200) {
  //       // 上传文件后获取服务器返回的数据
  //       let resultMessage = JSON.parse(response);
  //       this.newUserfaceimg = "http://localhost/eating/update/userfaceimg/" + resultMessage.resultParm.fileName;
  //     } else {
  //       // 上传文件后获取服务器返回的数据错误     
  //       this.createMessage('error', '上传失败.');
  //     }
  //   };
  //   this.uploader.queue[0].upload();
  // }

  //显示模态框
  showModal(titleTpl, contentTpl) {
    const modal = this.modalService.open({
      title: titleTpl,
      content: contentTpl,
      closable: false,
      onOk: () => {
        switch (titleTpl) {
          case '修改头像': {
            let faceimgName = this.newUserfaceimg.substring(this.newUserfaceimg.lastIndexOf('/') + 1);
            console.log("new faceimgName: " + faceimgName);
            return this.editFaceimg(faceimgName);
          }
          case '修改手机号': {
            return this.editPhone();
          }
          case '修改用户名': {
            return this.editUsername();
          }
        }
      },
      onCancel: () => {
        this.newUsername = '';
        this.newUserfaceimg = '';
        this.newPhone = '';
        this.validCode = '';

        if (this.timer != null) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    });
  }

  // 修改头像
  editFaceimg(faceimgName: string) {
    if (faceimgName) {
      this.createMessage('warning', '请输入正确的手机号码');
  }}

  // 修改手机号请求
  editPhone() {

    if (!phoneRegex.test(this.newPhone)) {
      this.createMessage('warning', '请输入正确的手机号码');
    } else if (!validCodeRegex.test(this.validCode)) {
      this.createMessage('warning', '请输入有效的验证码');
    } else {
      // 请求
      return this.userinfoService.editPhone(this.newPhone, this.validCode).then(
        resultMessage => {
          let resultCode = resultMessage.serviceResult;
          switch (resultCode) {
            case 1: {
              // 修改成功
              this.createMessage('success', '修改手机号成功');
              // 刷新用户信息
              this.reqUserinfo();
              return Promise.resolve("resolve");
            }
            case 1006: {
              //验证码有误
              this.createMessage('warning', '请输入正确的验证码');
              break;
            }
            case 1005: {
              //手机号码有误
              this.createMessage('warning', '请输入正确的手机号码');
              break;
            }
            case 1004: {
              //验证码过期
              this.createMessage('warning', '验证码已过期, 请重新获取');
              break;
            }
            case 1012: {
              //手机号已存在
              this.createMessage('warning', '手机号已存在');
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
    return Promise.reject("reject");
  }

  // 修改用户名请求
  editUsername() {

    if (this.newUsername == '') {
      this.createMessage('warning', '请输入新用户名');
    } else {
      return this.userinfoService.editUsername(this.userinfo.userinfoid, this.newUsername).then(
        resultMessage => {
          let resultCode = resultMessage.serviceResult;
          switch (resultCode) {
            case 1: {
              this.createMessage('success', '修改用户名成功');
              // 刷新用户信息
              this.reqUserinfo();
              return Promise.resolve("resolve");
            }
            case 1009: {
              this.createMessage('warning', '用户名长度错误');
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
    return Promise.reject("reject");
  }

  //验证码按钮状态
  phoneNumChange() {
    if (phoneRegex.test(this.newPhone)) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  };

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

      this.authService.getValidCode(this.newPhone).then(
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
  }

  // 定义通知
  reqUserinfo() {
    // 接收通知
    this.authService.reqUserinfo().then(
      resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            this.userinfo = resultMessage.resultParm.userinfo;
            this.userinfo.faceimg = "http://localhost/eating/update/userfaceimg/" + this.userinfo.faceimg;
            this.userinfo.phone = resultMessage.resultParm.phone;
            break;
          }
          default: {
            this.createMessage('error', '服务器繁忙, 请稍后再试.');
            break;
          }
        }
      });
  }

  // Message全局提示
  createMessage = (type, text) => {
    this._message.create(type, text);
  };

}
