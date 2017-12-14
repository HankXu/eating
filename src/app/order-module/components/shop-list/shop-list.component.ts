import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { ShopListService } from '../../service/shop-list.service';
import { Shop } from '../../../models/Shop';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})

export class ShopListComponent implements OnInit {

  shopList: Shop[];
  hasShopTag: boolean = false;
  city: string;
  address: string;

  constructor(
    private shopListService: ShopListService,  //在构造器的参数列表里填入需要注入的service
    private activatedRoute: ActivatedRoute,
    private _message: NzMessageService,
  ) {}


  //编写一个获取商店列表的方法
  getShopes(city: string, address: string): void {
    this.shopListService
      .getShopList(city, address)       //在这里调用service的获取数据方法，service返回的实际是一个Promise<objcec[]>对象
      .then(
        shops => {
        this.shopList = shops;
        this.hasShopTag = true;
        console.log(this.shopList);
      }, 
      error => {
        if(error == 3002){
          this.hasShopTag = false;
        }else{
          this._message.create('error',`${error}，请使用可定位地址或刷新页面`);
        }
      }
    );   //调用then方法,将返回的商店列表赋值给我们在这个类里定义的shopList

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.getShopes(queryParams.city, queryParams.address);
    });
  }

}
