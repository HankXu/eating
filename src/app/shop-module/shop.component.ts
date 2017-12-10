import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from './service/shopping-cart.service';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css'],
    providers: [ShoppingCartService]
})

export class ShopComponent implements OnInit{

    selectedGoods = {};

    constructor(){}

    ngOnInit(){

    }
}