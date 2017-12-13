import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualifi-info',
  templateUrl: './qualifi-info.component.html',
  styleUrls: ['./qualifi-info.component.css']
})
export class QualifiInfoComponent implements OnInit {

  imgArray = ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'];

  constructor() { }

  ngOnInit() {
    this.imgArray = ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png','https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'];
  }

}
