import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Shop } from '../../../models/Shop';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-shop-info-bar',
  templateUrl: './shop-info-bar.component.html',
  styleUrls: ['./shop-info-bar.component.css']
})
export class ShopInfoBarComponent implements OnInit {

  // @Input() shopInfo: Shop = new Shop();
  shopInfo: Shop = new Shop();

  private subscription: Subscription;

  constructor(
    private shopService: ShopService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.shopService
                          .shopInfo$
                          .subscribe(
                            shopInfo => {
                              this.shopInfo = shopInfo
                            }
                          )
  }

}
