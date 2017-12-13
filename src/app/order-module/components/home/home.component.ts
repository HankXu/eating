import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    private shopListService: ShopListService,
    private _message: NzMessageService
  ) { }

  setCity(result: string): void {
    this.currCity = result;
  }

  cascRender(label) {
    if (label[0] === '北京市')
      console.log(label);
    return label[label.length - 1];
  }

  setLocationCity(): void{
    //调用后台接口获取定位城市
    this.shopListService
    .getIpLocation()
    .then(city => this.setCity(city), error => this._message.create('error',`${error}，请手动选择城市`));
  }
  
  ngOnInit() {
    this.validateForm = this.fb.group({
      address: [null, [Validators.required]]
    });

    this.setLocationCity();
  }

}
