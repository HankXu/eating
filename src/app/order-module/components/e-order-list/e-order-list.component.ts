import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../service/order.service';


@Component({
  selector: 'app-e-order-list',
  templateUrl: './e-order-list.component.html',
  styleUrls: ['./e-order-list.component.css']
})
export class EOrderListComponent implements OnInit {

  constructor(
    private orderService: OrderService  //在构造器的参数列表里填入需要注入的service
  ) { }
  OrderList: object[];

  getOrders(): void{
    this.orderService
    .getOrderList()                              //在这里调用service的获取数据方法，service返回的实际是一个Promise<objcec[]>对象
    .then( orders => this.OrderList = orders);   //调用then方法,将返回的商店列表赋值给我们在这个类里定义的shopList
                                                                              
  }

  ngOnInit() {
    this.getOrders();
  }

}
