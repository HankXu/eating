import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-sub-nav',
  templateUrl: './shop-sub-nav.component.html',
  styleUrls: ['./shop-sub-nav.component.css']
})
export class ShopSubNavComponent implements OnInit {

  sortType: string = 'default';

  constructor() { }

  ngOnInit() {
  }

}
