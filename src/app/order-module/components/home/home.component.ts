import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ShopListService } from '../../service/shop-list.service';
import options from '../../city-cas';
import { NzMessageService } from 'ng-zorro-antd';
import { UseraddressService } from '../../../profile-module/service/useraddress.service';
import { NearbyAddressService } from '../../service/nearby-address.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ResultMessage } from '../../../models/ResultMessage';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  pc_options = options;  //省、市级联数据
  validateForm: FormGroup;

  currCity: string = "北京市";  //定位城市

  address: string = "";  //填写的具体地址
  currgeohash: string = "wx4g08njpmn"; //当前定位的geoHash，默认为天安门
  nearbyAddress: any[];  //获取的附近地点地标


  constructor(
    private fb: FormBuilder,
    private shopListService: ShopListService,
    private _message: NzMessageService,
    private router: Router,
    private nearbyAddressService: NearbyAddressService,
  ) { }

  setCity(result: string): void {
    this.currCity = result;
  }

  cascRender(label) {
    if (label[0] === '北京市')
      console.log(label);
    this.currCity = label[label.length - 1];
    return label[label.length - 1];
  }

  setLocationCity(): void{
    //调用后台接口获取定位城市
    this.shopListService
    .getIpLocation()
    .then(city => this.setCity(city), error => this._message.create('error',`${error}，请手动选择城市`));
  }
  
  searchNearbyShop(): void{
    this.router.navigate(['home/shop'],{
      queryParams: {
        city: this.currCity,
        address: this.address
      }
    })
  }

  selectAddress(address: string, geohash: string) {
    this.address = address;
    this.currgeohash = geohash;
  }

  获取附近的地址
  getNearbyAddress() {
    console.log(this);
    if(localStorage.getItem("locatedInfo")){
      this.currgeohash = JSON.parse(localStorage.getItem("locatedInfo")).geoHash;
    }

    if (this.address != '') {
      this.nearbyAddressService.getNearbyAddress(this.address, this.currgeohash).then(
        resultMessage => {
          console.log(resultMessage);
          let resultCode = resultMessage.serviceResult;
          switch (resultCode) {
            case 1: {
              console.log(resultMessage.resultParm);
              this.nearbyAddress = resultMessage.resultParm.nearbyAddress;
              break;
            }
            default: {
              //其他错误
              console.log(resultMessage.resultInfo);
              break;
            }
          }
        },
        error => {
          this._message.create('error', '服务器繁忙, 请稍后再试.');
        }
      );
    }

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      address: [null, [Validators.required]]
    });

    this.setLocationCity();

  }

}
