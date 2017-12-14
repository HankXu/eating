import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ShopListService } from '../../service/shop-list.service';
import options from '../../city-cas';
import { NzMessageService } from 'ng-zorro-antd';


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

  constructor(
    private fb: FormBuilder,
    private shopListService: ShopListService,
    private _message: NzMessageService,
    private router: Router
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

  ngOnInit() {
    this.validateForm = this.fb.group({
      address: [null, [Validators.required]]
    });

    this.setLocationCity();
  }

}
