import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';

import { MenuService } from '../../service/menu.service.';
import { Useraddress } from '../../../models/Useraddress';
import { UseraddressService } from '../../service/useraddress.service';

const phoneRegex = /^(13\d{9}$)|(15[0,1,2,3,5,6,7,8,9]\d{8}$)|(18[0,2,5,6,7,8,9]\d{8}$)|(147\d{8})$/;
const addressRegex = /^.{1,64}$/;
const fullnameRegex = /^.{1,16}$/;

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  addressList: Array<Useraddress>;

  addressPo: Useraddress;

  nearbyAddress: Array<any>;

  localgeohash: string;

  constructor(
    private menuService: MenuService,
    private confirmServ: NzModalService,
    private useraddressService: UseraddressService,
    private _message: NzMessageService
  ) { }

  ngOnInit() {
    this.menuService.currentMenu(2);
    this.getAddressList();
    this.localgeohash = JSON.parse(localStorage.getItem("locatedInfo")).geoHash;
  }

  // 获取地址列表
  getAddressList() {
    this.useraddressService.getUserAddressList().then(
      resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            this.addressList = resultMessage.resultParm.addressList;
            break;
          }
          default: {
            //其他错误
            this.createMessage('error', '服务器繁忙, 请稍后再试.');
            break;
          }
        }
      },
      error => {
        this.createMessage('error', '服务器繁忙, 请稍后再试.');
      }
    );
  }

  // 删除地址模态框
  deleteAddressModal(addressid: number) {
    this.confirmServ.confirm({
      title: '确认删除',
      content: '<b>您是否确认要删除这项地址信息</b>',
      onOk: () => {
        this.deleteAddress(addressid);
      },
      onCancel: () => {
      }
    });
  }

  // 删除地址请求
  deleteAddress(addressid: number) {
    this.useraddressService.removeUserAddress(addressid).then(
      resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            this.createMessage('success', '删除地址成功');
            this.getAddressList();
          }
          default: {
            //其他错误
            this.createMessage('error', '服务器繁忙, 请稍后再试.');
          }
        }
      },
      error => {
        this.createMessage('error', '服务器繁忙, 请稍后再试.');
      }
    );
  }

  // 添加地址模态框
  addAddressModal(titleTpl, contentTpl) {
    this.addressPo = new Useraddress();
    this.addressPo.fullname = ''
    this.addressPo.address = ''
    this.addressPo.phone = ''
    this.addressPo.geoname = ''

    const modal = this.confirmServ.open({
      title: titleTpl,
      content: contentTpl,
      closable: false,
      onOk: () => {
        return this.addAddress();
      },
      onCancel: () => {
        this.addressPo = new Useraddress();
        this.nearbyAddress = null;
      }
    });
  }

  // 添加地址请求
  addAddress() {
    // 字段校验
    if (!phoneRegex.test(this.addressPo.phone)) {
      this.createMessage('warning', '请输入正确的手机号码');
    } else if (!fullnameRegex.test(this.addressPo.fullname)) {
      this.createMessage('warning', '请输入姓名');
    } else if (!addressRegex.test(this.addressPo.address)) {
      this.createMessage('warning', '请输入地址');
    } else if (this.addressPo.geohash == '' || this.addressPo.geoname == '') {
      this.createMessage('warning', '请在下拉的定位地址中选择一个地址');
    } else {
      return this.useraddressService.addUserAddress(this.addressPo).then(
        resultMessage => {
          let resultCode = resultMessage.serviceResult;
          switch (resultCode) {
            case 1: {
              this.createMessage('success', '添加地址成功');
              this.getAddressList();
              this.nearbyAddress = null;
              return Promise.resolve("resolve");
            }
            case 1007: {
              this.createMessage('warning', '请输入格式正确的手机号码');
              break;
            }
            case 1010: {
              this.createMessage('warning', '姓名长度不正确');
              break;
            }
            default: {
              //其他错误
              this.createMessage('error', '服务器繁忙, 请稍后再试.');
              break;
            }
          }
          return Promise.reject("操作失败, 不关闭模态框");
        },
        error => {
          this.createMessage('error', '服务器繁忙, 请稍后再试.');
          return Promise.reject("操作失败, 不关闭模态框");
        }
      );
    }
    return Promise.reject("操作失败, 不关闭模态框");
  }

  // 修改地址模态框
  editAddressModal(titleTpl, contentTpl, useraddressid) {
    this.addressPo = new Useraddress();
    this.addressPo.fullname = ''
    this.addressPo.address = ''
    this.addressPo.phone = ''
    this.addressPo.geoname = ''

    // 获取对应地址内容
    this.getAddress(useraddressid);
    // 打开模态框
    const modal = this.confirmServ.open({
      title: titleTpl,
      content: contentTpl,
      closable: false,
      onOk: () => {
        return this.editAddress();
      },
      onCancel: () => {
        this.addressPo = new Useraddress();
        this.nearbyAddress = null;
      }
    });
  }

  // 获取地址请求
  getAddress(useraddressid: number) {
    this.useraddressService.getUserAddress(useraddressid).then(
      resultMessage => {
        let resultCode = resultMessage.serviceResult;
        switch (resultCode) {
          case 1: {
            this.addressPo = resultMessage.resultParm.userAddress;
            break;
          }
          default: {
            //其他错误
            this.createMessage('error', '服务器繁忙, 请稍后再试.');
            break;
          }
        }
      },
      error => {
        this.createMessage('error', '服务器繁忙, 请稍后再试.');
      }
    );
  }

  // 修改地址请求
  editAddress() {
    // 字段校验
    if (!phoneRegex.test(this.addressPo.phone)) {
      this.createMessage('warning', '请输入正确的手机号码');
    } else if (!fullnameRegex.test(this.addressPo.fullname)) {
      this.createMessage('warning', '请输入姓名');
    } else if (!addressRegex.test(this.addressPo.address)) {
      this.createMessage('warning', '请输入地址');
    } else if (this.addressPo.geohash == '' || this.addressPo.geoname == '') {
      this.createMessage('warning', '请在下拉的定位地址中选择一个地址');
    } else {
      return this.useraddressService.editUserAddress(this.addressPo).then(
        resultMessage => {
          let resultCode = resultMessage.serviceResult;
          switch (resultCode) {
            case 1: {
              this.createMessage('success', '修改地址成功');
              this.getAddressList();
              this.nearbyAddress = null;
              return Promise.resolve("resolve");
            }
            case 1007: {
              this.createMessage('warning', '请输入格式正确的手机号码');
              break;
            }
            case 1010: {
              this.createMessage('warning', '姓名长度不正确');
              break;
            }
            default: {
              //其他错误
              this.createMessage('error', '服务器繁忙, 请稍后再试.');
              break;
            }
          }
          return Promise.reject("操作失败, 不关闭模态框");
        },
        error => {
          this.createMessage('error', '服务器繁忙, 请稍后再试.');
          return Promise.reject("操作失败, 不关闭模态框");
        }
      );
    }
    return Promise.reject("操作失败, 不关闭模态框");
  }

  // 获取附近的地址
  getNearbyAddress() {
    // TODO: 获取缓存中的数据
    // this.localgeohash = "w7y3p22ft8v";
    this.addressPo.geohash = '';

    if (this.addressPo.geoname != '') {
      this.useraddressService.getNearbyAddress(this.addressPo.geoname, this.localgeohash).then(
        resultMessage => {
          let resultCode = resultMessage.serviceResult;
          switch (resultCode) {
            case 1: {
              console.log(resultMessage.resultParm);
              this.nearbyAddress = resultMessage.resultParm.nearbyAddress;
              break;
            }
            default: {
              //其他错误
              break;
            }
          }
        },
        error => {
          this.createMessage('error', '服务器繁忙, 请稍后再试.');
        }
      );
    }

  }

  selectAddress(geoname: string, geohash: string) {
    this.addressPo.geoname = geoname;
    this.addressPo.geohash = geohash;
  }

  // Message全局提示
  createMessage = (type, text) => {
    this._message.create(type, text);
  };
}
