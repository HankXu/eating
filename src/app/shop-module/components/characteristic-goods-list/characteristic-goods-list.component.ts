import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

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
        id: 1,
        goodsImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsName: '红烧超模',
        goodsPrice: 1800,

      },
      {
        id: 2,
        goodsImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsName: '红烧超模2',
        goodsPrice: 1200,

      },
      {
        id: 3,
        goodsImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsName: '红烧超模3',
        goodsPrice: 18990,

      },
      {
        id: 4,
        goodsImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsName: '红烧超模4',
        goodsPrice: 38000,

      },
      {
        id: 5,
        goodsImg: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        goodsName: '红烧超模5',
        goodsPrice: 28000,

      },
    ]
  };

  @Output() onSelect = new EventEmitter<object>()

  select(id: number): void {
    console.log("选择触发");
    this.onSelect.emit(this.speGoods.goodsList.find(curr => curr.id === id));
  }

  constructor() { }

  ngOnInit() {
  }

}
