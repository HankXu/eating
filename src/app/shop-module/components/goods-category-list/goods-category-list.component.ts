import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goods-category-list',
  templateUrl: './goods-category-list.component.html',
  styleUrls: ['./goods-category-list.component.css']
})
export class GoodsCategoryListComponent implements OnInit {

  categoryList: object[] = [
    {id: 1, categoryName: '早餐'},
    {id: 2, categoryName: '午餐'},
    {id: 3, categoryName: '晚餐'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
