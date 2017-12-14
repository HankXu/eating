import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from '../../service/shop.service';
import { GroupedGoods } from '../../../models/GroupedGoods';

@Component({
  selector: 'app-all-goods-list',
  templateUrl: './all-goods-list.component.html',
  styleUrls: ['./all-goods-list.component.css']
})
export class AllGoodsListComponent implements OnInit {

  groupedGoodsList: GroupedGoods[] = [];

  private subscription_groupedGoods: Subscription;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute
  ) { }

  
  subjectData() {
    this.shopService.groupedGoods$
      .subscribe(
      groupedGoods => this.groupedGoodsList = groupedGoods
      )
  }
  ngOnInit() {
    this.subjectData();
    this.activatedRoute.params.subscribe(
      params => {
        this.shopService.getGoodsInShop(+params.id);
      });
  }

}
