import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingCartService } from '../../service/shopping-cart.service';
import { Goods } from '../../../models/Goods';
import { ShopService } from '../../service/shop.service';
import { GroupedGoods } from '../../../models/GroupedGoods';

@Component({
  selector: 'app-characteristic-goods-list',
  templateUrl: './characteristic-goods-list.component.html',
  styleUrls: ['./characteristic-goods-list.component.css']
})
export class CharacteristicGoodsListComponent implements OnInit {

  @Input() groupedGoods: GroupedGoods;

  select(id: number): void {
    console.log("选择触发"+id+this.groupedGoods.goods.length);

    let selectedGoods = this.groupedGoods.goods.find(curr => curr.goodsid == id);

    console.log(selectedGoods);
    this.shoppingCartService.announceCurrentSelected(selectedGoods as Goods);
  }

  constructor(
    private shoppingCartService: ShoppingCartService,
    private shopService: ShopService
  ) { }



  ngOnInit() {
    
  }

}
