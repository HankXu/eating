import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-all-goods-list',
  templateUrl: './all-goods-list.component.html',
  styleUrls: ['./all-goods-list.component.css']
})
export class AllGoodsListComponent implements OnInit {

  @Output()
  getSelected = new EventEmitter<object>();

  onSelect(selectedItem: object): void {
    console.log(selectedItem);
    this.getSelected.emit(selectedItem);
  }

  constructor() { }

  ngOnInit() {
  }

}
