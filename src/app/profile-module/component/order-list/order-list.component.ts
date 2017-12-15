import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { OrderService } from '../../service/order.service';
import { ordertypes } from '../../profile.component';
import { MenuService } from '../../service/menu.service.';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  ordertypes = ordertypes;

  currentType: number;

  current = 1;
  total = 1;
  isLoading = false;

  orderList = [];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router:Router,
    private modalService: NzModalService,
    private _message: NzMessageService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap(
      params => {
        console.log("changeType");
        this.currentType = +params.get('searchType');
        this.current = 1;
        this.getOrders();

        this.menuService.currentMenu(this.currentType + 4);

        return params.get('searchType');
      }).toPromise();
  }

  //请求后台接口，返回用户的所有订单
  getOrders(): void {
    this.isLoading = true;
    console.log("searchType: " + this.currentType);
    console.log("pageindex: " + this.current);

    this.orderService
      .getOrderList(this.currentType, this.current)
      .then(resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            this.orderList = resultMessage.resultParm.data;
            this.total = resultMessage.resultParm.total;
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

  //跳转到订单详情页面
  checkOrderDetail(ordernum:number):void{
    this.router.navigate(['/profile/orderdetail', ordernum]);
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
          this.getOrders();
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
