import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { Goods } from '../../../models/Goods';

@Component({
  selector: 'app-characteristic-goods-list',
  templateUrl: './characteristic-goods-list.component.html',
  styleUrls: ['./characteristic-goods-list.component.css']
})
export class CharacteristicGoodsListComponent implements OnInit {

  speGoods = {
    categoryName: '早餐',
    goodsList: [
      {
        goodsId: 1,
        shopId: 1,
        goodsCategoryId: 1,
        goodsName: '红烧超模',
        goodsPrice: 1800,
        goodsPhoto: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsDesc: '超级好吃超级好吃超级好吃超级好吃超级好吃超级好吃超级好吃',
        salesAmount: 1000
      },
      {
        goodsId: 2,
        shopId: 1,
        goodsCategoryId: 1,
        goodsName: '红烧超模2',
        goodsPrice: 1800,
        goodsPhoto: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsDesc: '超级好吃',
        salesAmount: 1000
      },
      {
        goodsId: 3,
        shopId: 1,
        goodsCategoryId: 1,
        goodsName: '红烧超模3',
        goodsPrice: 180,
        goodsPhoto: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsDesc: '超级好吃',
        salesAmount: 100
      },
      {
        goodsId: 4,
        shopId: 1,
        goodsCategoryId: 1,
        goodsName: '红烧超模4',
        goodsPrice: 2800,
        goodsPhoto: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsDesc: '超级好吃',
        salesAmount: 2000
      }
    ]
  };


  select(id: number): void {
    console.log("选择触发");

    let selectedGoods = this.speGoods.goodsList.find(curr => curr.goodsId === id);
    this.shoppingCartService.announceCurrentSelected(selectedGoods as Goods);
  }

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

}
