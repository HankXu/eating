import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.sethMenuIndex(0);
  }

}
