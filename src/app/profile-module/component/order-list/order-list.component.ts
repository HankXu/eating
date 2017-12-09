import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { OrderService } from '../../service/order.service';
import { ordertypes } from '../../profile.component';
import { MenuService } from '../../service/menu.service.';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  ordertypes = ordertypes;

  currentType: number;

  current = 1;
  total = 200;
  isLoading = false;

  orderList = [];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap(
      params => {
        console.log("changeType");
        this.currentType = +params.get('searchType');
        this.current = 1;
        this.getOrders();

        this.menuService.sethMenuIndex(this.currentType + 4);

        return params.get('searchType');
      }).toPromise();
  }

  getOrders(): void {
    this.isLoading = true;

    console.log("searchType: " + this.currentType);
    console.log("pageindex: " + this.current);

    this.orderService
      .getOrderList(this.currentType, this.current)
      .then(orders => this.orderList = orders)
      .then(orders => this.isLoading = false);
  }

}
