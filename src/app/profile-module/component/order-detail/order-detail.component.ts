import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { MenuService } from '../../service/menu.service.';
import { OrderService } from '../../service/order.service';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import { OrderDetail } from '../../../models/OrderDetail';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private _message: NzMessageService,
    private menuService: MenuService
  ) { }

  orderid:String;
  isLoading = false;
  order:OrderDetail;

  ngOnInit() {
    this.menuService.currentMenu(null);
    this.route.paramMap
    .switchMap(
    params => {
      this.orderid = params.get('orderid');
      this.getOrderDetail(this.orderid);
      return params.get('orderid');
    }).toPromise();
  }

  getOrderDetail(orderid:String):void{
    this.orderService
    .getOrderDetail(this.orderid)
    .then(resultMessage => {
      let resultCode = resultMessage.serviceResult;
      switch (resultCode) {
        case 1: {
          this.order = resultMessage.resultParm.data;
          break;
        }
        default: {
          this.createMessage('error', '服务器繁忙, 请稍后再试.');
          break;
        }
      }
    })
    .then(resultMessage => this.isLoading = false);
  }


   //点击付款按钮
   payOrder(orderid:number):void{
    this._message.info("你点击了付款按钮");
  }

  //取消订单
  cancelOrder(orderid:String):void{
    this.orderService
    .cancelOrder(orderid)
    .then(resultMessage => {
      let resultCode = resultMessage.serviceResult;
      switch (resultCode) {
        case 1: {
          this.getOrderDetail(this.orderid);
          break;
        }
        default: {
          this.createMessage('error', '服务器繁忙, 请稍后再试.');
          break;
        }
      }
    })
    .then(resultMessage => this.isLoading = false);
  }

  //退单
  returnOrder(orderid:String):void{
    this.orderService
    .returnOrder(orderid)
    .then(resultMessage => {
      let resultCode = resultMessage.serviceResult;
      switch (resultCode) {
        case 1: {
          this.getOrderDetail(this.orderid);
          break;
        }
        default: {
          this.createMessage('error', '服务器繁忙, 请稍后再试.');
          break;
        }
      }
    })
    .then(resultMessage => this.isLoading = false);
  }

  //催单
  remindOrder(orderid:String):void{
    this.orderService
    .remindOrder(orderid)
    .then(resultMessage => {
      let resultCode = resultMessage.serviceResult;
      switch (resultCode) {
        case 1: {
          this._message.create("success", `催单成功，请耐心等待`);
          break;
        }
        default: {
          this.createMessage('error', '服务器繁忙, 请稍后再试.');
          break;
        }
      }
    })
    .then(resultMessage => this.isLoading = false);
  }



  
  // Message全局提示
  createMessage = (type, text) => {
    this._message.create(type, text);
  };
}
