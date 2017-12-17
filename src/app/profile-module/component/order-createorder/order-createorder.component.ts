import { Component, OnInit } from '@angular/core';


import { UseraddressService } from '../../service/useraddress.service';

import { Useraddress} from '../../../models/Useraddress';

import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

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
  ) { }

  isLoading = false;
  useraddresses:Useraddress[];

  ngOnInit() {
    this.initUseraddress();
  }

  initUseraddress():void{
    this.isLoading = true;
    this.useraddressService
      .getUserAddressList()
      .then(resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            
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
