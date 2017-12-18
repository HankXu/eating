import { Component, OnInit } from '@angular/core';


import { UseraddressService } from '../../../profile-module/service/useraddress.service';

import { Useraddress} from '../../../models/Useraddress';

import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { PlaceOrderService } from '../../../core-module/service/place-order.service';
import { PlaceOrderInfo } from '../../../models/PlaceOrderInfo';

@Component({
  selector: 'app-order-createorder',
  templateUrl: './order-createorder.component.html',
  styleUrls: ['./order-createorder.component.css']
})


export class OrderCreateorderComponent implements OnInit {
  constructor(
    private useraddressService:UseraddressService,
    private modalService: NzModalService,
    private _message: NzMessageService,
    private placeOrderService: PlaceOrderService
  ) { }

  isLoading = false;
  useraddresses:Useraddress[];
  useraddressSelected:number;

  placeOrderInfo: PlaceOrderInfo = new PlaceOrderInfo();  //里面包含商店信息、购物车列表的商品、购物车总价。列表商品有商品图片地址、名称、id、数量、单价

  initUseraddress():void{
    this.isLoading = true;
    this.useraddressService
      .getUserAddressList()
      .then(resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            this.useraddresses = resultMessage.resultParm.addressList;
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


  cusphone:String;
  cusname:String;
  cusaddress:String;
  remark:String;
  reachtime:String;

  useraddressChange():void{
    // console.info(this.useraddressSelected);
    for(let i = 0;i<this.useraddresses.length;i++){
      if(this.useraddresses[i].useraddressid == this.useraddressSelected){
        this.cusname= this.useraddresses[i].fullname;
        this.cusaddress= this.useraddresses[i].geoname + " " + this.useraddresses[i].address;
        this.cusphone = this.useraddresses[i].phone;
      }
    }

  }


  ngOnInit() {
    this.initUseraddress();

    this.placeOrderService.
    placeOrderSource$
    .subscribe(
      placeOrderInfo => {
        if(placeOrderInfo.totalcount != undefined){
          this.placeOrderInfo = placeOrderInfo;
        }
      }
    )
    console.log(this.placeOrderInfo.totalcount);
  }


  // Message全局提示
  createMessage = (type, text) => {
    this._message.create(type, text);
  };
}
