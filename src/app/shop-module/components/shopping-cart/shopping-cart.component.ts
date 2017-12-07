import { Component, OnInit, OnChanges, DoCheck, Input, Output} from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, DoCheck{

  cartItems: any[] = [];

  cartTotal: number = 0;

  @Input() 
  set cartItem( cartItem: any){
    this.addItem(cartItem);
    this.cartAcountCal();
  }

  addItem(item: any): void {
    let _target = this.cartItems.findIndex( curr => item.goodsId === curr.goodsId)
    if(_target !== -1){
      this.cartItems[_target].goodsCounts++;
    } else {
      this.cartItems.push(item);
    }
    
  }

  clearCart(): void {
    this.cartItems = [];
  }
  //检查是否有为0的选项，有则移除
  checkAcount(): void {
    this.cartItems = this.cartItems.filter( curr => curr.goodsCounts > 0);
  }

  //重新计算总价
  cartAcountCal(): void {
    this.cartTotal = 0;
    this.cartItems.forEach( curr => this.cartTotal += curr.goodsCounts*curr.goodsPrice);
  }

  
  constructor() { 
    this.cartAcountCal(); 
  }

  ngOnInit() {
    
  }

  //当触发检测的时候检查是否有小于0的选项并重算总价，有些浪费资源，但是一下没找到其他解决办法
  ngDoCheck() {
    this.checkAcount();
    this.cartAcountCal(); 
  }    

}
