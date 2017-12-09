import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.sethMenuIndex(1);
  }

}
