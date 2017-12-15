import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core-module/service/auth.service';
import { Router } from '@angular/router';

export const ordertypes = ["所有订单", "未支付订单", " 已取消订单", "待接单", "已接单", " 已完成订单", "已退单"];
//0-未支付  1-已取消   2-待接单  3-已接单    4-已完成    5-已退单     6-退单处理中 7-已评价

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
    }

    // 定义通知
    recieveAnnounce() {
        // 接收通知
        this.authService.reqIslogin$.subscribe(isLogin => {
            if (!isLogin) {
                console.log("个人中心 验证登录状态" + isLogin);
                this.router.navigate(['/login']);
            }
        });
    }
}