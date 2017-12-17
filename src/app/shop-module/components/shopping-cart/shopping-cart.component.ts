import { Component, OnInit, OnChanges, DoCheck, Input, Output, OnDestroy} from '@angular/core';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { ShopService } from '../../service/shop.service';
import { Goods } from '../../../models/Goods';
import { Subscription } from 'rxjs/Subscription';
import { InnerCartGoods } from '../../../models/InnerCartGoods';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, DoCheck, OnDestroy{

  cartItems: InnerCartGoods[] = [];

  cartTotal: number = 0;

  isOpen: boolean = false;


  //用于取消订阅
  subscription: Subscription;

  isOpenSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private shopService: ShopService
  ) {}

  addItem(item: Goods): void {
    let _target = this.cartItems.findIndex( curr => item.goodsid === curr.goodsId)
    if(_target !== -1){
      this.cartItems[_target].goodsCounts++;
    } else {
      let newItem = {
        goodsId: item.goodsid,
        goodsPrice: item.goodsprice,
        goodsName: item.goodsname,
        goodsCounts: 1
      }
      this.cartItems.push(newItem as InnerCartGoods);
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

  ngOnInit() {
    this.subscription = this.shoppingCartService
    .selectedGoods$
    .subscribe( selectedGoods => {
      //接收发射的新对象
      this.addItem(selectedGoods);
      this.cartAcountCal(); 
      
    });
    
    this.isOpenSubscription = this.shopService
    .shopInfo$
    .subscribe(
      shopInfo => {
        this.isOpen = shopInfo.isonline === 1;
      }
    )
  }

  //当触发检测的时候检查是否有小于0的选项并重算总价，有些浪费资源，因为暂时没法子监听number input的事件。
  ngDoCheck() {
    this.checkAcount();
    this.cartAcountCal(); 
  }    

  ngOnDestroy() {

    //销毁时取消订阅
    this.subscription.unsubscribe();
  }

}
