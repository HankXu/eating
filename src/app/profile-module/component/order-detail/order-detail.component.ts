import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  orderid:number;
  orderitems:Object[];

  ngOnInit() {
    this.route.paramMap
    .switchMap(
    params => {
      this.orderid = +params.get('orderid');
  
      return params.get('orderid');
    }).toPromise();
  }

}
