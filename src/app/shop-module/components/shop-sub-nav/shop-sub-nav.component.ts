import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-shop-sub-nav',
  templateUrl: './shop-sub-nav.component.html',
  styleUrls: ['./shop-sub-nav.component.css']
})
export class ShopSubNavComponent implements OnInit {

  private subscription: Subscription;

  shopid: number;
  sortType: string = 'default';

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.subscription = this.shopService
    .shopInfo$
    .subscribe(
      shopInfo => {
        this.shopid = shopInfo.shopid;
      }
    )
  }

}
