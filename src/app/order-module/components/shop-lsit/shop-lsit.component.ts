import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ShopListService } from '../../service/shop-list.service';

const SHOPES = [
  {
    shopName: '三个麻辣鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 12
  },
  {
    shopName: '小胖口水鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 1200
  },
  {
    shopName: '大周手撕鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 135
  },
  {
    shopName: '少林寺童子鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 763
  },
  {
    shopName: '意志烤鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 120000
  },
  {
    shopName: '大周手撕鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 135
  },
  {
    shopName: '少林寺童子鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 763
  },
  {
    shopName: '意志烤鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 120000
  },
  {
    shopName: '大周手撕鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 135
  },
  {
    shopName: '少林寺童子鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 763
  },
  {
    shopName: '意志烤鸡店',
    shopIntroduce: '一家能吃的店',
    shopLogo: '../../../../assets/logo.png',
    sales: 120000
  }
]

@Component({
  selector: 'app-shop-lsit',
  templateUrl: './shop-lsit.component.html',
  styleUrls: ['./shop-lsit.component.css']
})

export class ShopLsitComponent implements OnInit {

  shopList: object[];

  constructor(
    private shopListService: ShopListService  //在构造器的参数列表里填入需要注入的service
  ) {}


  //编写一个获取商店列表的方法
  getShopes(): void{
    this.shopListService
    .getShopList()                              //在这里调用service的获取数据方法，service返回的实际是一个Promise<objcec[]>对象
    .then( shopes => this.shopList = shopes);   //调用then方法,将返回的商店列表赋值给我们在这个类里定义的shopList
                                                                              
  }

  ngOnInit() {
    this.getShopes();  //在此调用我们在这个类里定义的获取商店方法，这样当这个组件被加载时就会调用这个方法
                       //获取数据，这样渲染页面时我们就已经获取到了商店数据
  }

}
