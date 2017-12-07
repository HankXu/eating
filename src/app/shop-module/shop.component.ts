import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css'],
})

export class ShopComponent implements OnInit{

    selectedGoods = {};

    constructor(){}

    ngOnInit(){

    }
}