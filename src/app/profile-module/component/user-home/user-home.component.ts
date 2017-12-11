import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';
import { AuthService } from '../../../core-module/service/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  username: string;
  userfaceimg: string;
  phone: string;

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.menuService.currentMenu(0);
    this.recieveAnnounce();
    this.authService.getUserinfo();
  }

  // 定义通知
  recieveAnnounce() {
    // 接收通知
    this.authService.reqUserinfo$.subscribe(userInfo => {
      if (userInfo != null) {
        this.username = userInfo.username;
        this.phone = userInfo.phone;
        if (userInfo.faceimg == null) {
          this.userfaceimg = '';
        } else {
          this.userfaceimg = 'http://localhost/eating/update/userfaceimg/' + userInfo.faceimg;
        }
      }
    });
  }

}
