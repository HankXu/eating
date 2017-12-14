import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-qualifi-info',
  templateUrl: './qualifi-info.component.html',
  styleUrls: ['./qualifi-info.component.css']
})
export class QualifiInfoComponent implements OnInit {

  imgArray = ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'];

  private subscription: Subscription;

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.subscription = this.shopService
    .shopInfo$
    .subscribe(
      shopInfo => {
        this.imgArray.push(shopInfo.businesslicense);
        this.imgArray.push(shopInfo.cateringlicense);
      }
    )
    // this.imgArray = ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png','https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'];
  }

}
