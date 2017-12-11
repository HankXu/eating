import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  n = [1, 2, 3, 4];

  constructor(
    private menuService: MenuService,
    private confirmServ: NzModalService
  ) { }

  ngOnInit() {
    this.menuService.currentMenu(2);
  }

  delete(addressid: number) {
    this.confirmServ.confirm({
      title: '确认删除',
      content: '<b>您是否确认要删除这项地址信息</b>',
      onOk() {
        console.log("delete address: " + addressid);
      },
      onCancel() {
      }
    });
  }

  // 添加地址模态框
  addAddress(titleTpl, contentTpl) {
    const modal = this.confirmServ.open({
      title: titleTpl,
      content: contentTpl,
      closable: true,
      showConfirmLoading: true,
      onOk: () => {
        console.log("add address");
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      },
      onCancel: () => {
      }
    });
  }

  // 修改地址模态框
  editAddress(titleTpl, contentTpl, index) {
    const modal = this.confirmServ.open({
      title: titleTpl,
      content: contentTpl,
      closable: true,
      showConfirmLoading: true,
      onOk: () => {
        console.log("edit address: " + index);
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      },
      onCancel: () => {
      }
    });
  }
}
