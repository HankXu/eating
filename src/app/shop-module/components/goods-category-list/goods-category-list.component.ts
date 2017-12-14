import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../service/shop.service';
import { GroupedGoods } from '../../../models/GroupedGoods';

@Component({
  selector: 'app-goods-category-list',
  templateUrl: './goods-category-list.component.html',
  styleUrls: ['./goods-category-list.component.css']
})
export class GoodsCategoryListComponent implements OnInit {

  // categoryList: object[] = [
  //   {id: 1, categoryName: '早餐'},
  //   {id: 2, categoryName: '午餐'},
  //   {id: 3, categoryName: '晚餐'},
  // ]
  categoryList: object[] = [];

  constructor(
    private shopService: ShopService,
  ) { }

  ngOnInit() {

    this.shopService.groupedGoods$
    .subscribe(
      groupedGoods => {
        for(let goods of groupedGoods){
          this.categoryList.push({categoryName: goods.categoryName});
        }
      }
    )
  }

}
