import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core-module/service/auth.service';
import { Router } from '@angular/router';

export const ordertypes = ["所有订单", "未支付订单", " 已取消订单", "待接单", "已接单", " 已完成订单", "待评价订单", "已退单"];

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.recieveAnnounce();
        this.authService.getIsLogin();
    }

    // 定义通知
    recieveAnnounce() {
        // 接收通知
        this.authService.reqIslogin$.subscribe(isLogin => {
            if (!isLogin) {
                this.router.navigate(['/login']);
            }
        });
    }
}