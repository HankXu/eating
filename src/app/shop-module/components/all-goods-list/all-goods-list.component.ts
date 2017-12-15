import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from '../../service/shop.service';
import { SortwayService } from '../../service/sortway.service';
import { GroupedGoods } from '../../../models/GroupedGoods';

@Component({
  selector: 'app-all-goods-list',
  templateUrl: './all-goods-list.component.html',
  styleUrls: ['./all-goods-list.component.css']
})
export class AllGoodsListComponent implements OnInit,OnDestroy {

  groupedGoodsList: GroupedGoods[] = [];
  defaultSortedList: GroupedGoods[] = [];  //默认排序
  salesSortedList: GroupedGoods[] = [];  //销量排序
  priceSortedList: GroupedGoods[] = [];  //价格排序

  private subscription_groupedGoods: Subscription;
  private subscription_sortway: Subscription;

  constructor(
    private shopService: ShopService,
    private sortwayService: SortwayService,
    private activatedRoute: ActivatedRoute
  ) { }

  changeSortedWay(type: string){
    this.sortedCheck();  //检查是否有进行过排序，如无，则先排序
    switch(type){
      case '销量':
      this.groupedGoodsList = this.salesSortedList;
      break;
      case '价格':
      this.groupedGoodsList = this.priceSortedList;
      break;
      default:
      this.groupedGoodsList = this.defaultSortedList;
    }
  }

  sortedCheck(): void {
    if(this.salesSortedList.length ===0 && this.groupedGoodsList.length !==0){
      //销量排序数组没元素，且已经有数据，则调用两个排序。效率上，一开始痛过，之后就轻松了
      this.doGoodsSortSales();
      this.doGoodsSortPrice();
    }
  }

  doGoodsSortSales(): void {
    let tempGroupedGoods: GroupedGoods = {
      categoryName: "销量排行",
      goods: this.groupedGoodsList[0].goods
    };

    for(let i = 1; i < this.groupedGoodsList.length; i++){
      tempGroupedGoods.goods.concat(this.groupedGoodsList[i].goods);
    }

    tempGroupedGoods.goods.sort( (curr,next) => next.salesamount - curr.salesamount);  //销量按降序排行
    this.salesSortedList = [tempGroupedGoods];
  }

  doGoodsSortPrice(): void {

    let tempGroupedGoods: GroupedGoods = {
      categoryName: "价格排行",
      goods: this.groupedGoodsList[0].goods
    };

    for(let i = 1; i < this.groupedGoodsList.length; i++){
      tempGroupedGoods.goods.concat(this.groupedGoodsList[i].goods);
    }

    tempGroupedGoods.goods.sort( (curr,next) => curr.goodsprice - next.goodsprice);  //售价按升序排行
    this.priceSortedList = [tempGroupedGoods];
  }

  
  subjectData() {
    this.subscription_groupedGoods = this.shopService.groupedGoods$
      .subscribe(
      groupedGoods => {
        this.groupedGoodsList = groupedGoods;
        this.defaultSortedList = groupedGoods;
      });
    this.subscription_sortway = this.sortwayService.sortedWay$
        .subscribe(
          sortedWay => this.changeSortedWay(sortedWay)
        )
  }
  ngOnInit() {
    this.subjectData();
    this.activatedRoute.params.subscribe(
      params => {
        this.shopService.getGoodsInShop(+params.id);
      });
  }

  ngOnDestroy(){
    this.subscription_groupedGoods.unsubscribe();
    this.subscription_sortway.unsubscribe();
  }

}
