import { Component, OnInit } from '@angular/core';

export const ordertypes = ["所有订单", "未支付订单", " 已取消订单", "待接单", "已接单", " 已完成订单", "待评价订单", "已退单"];

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }
}