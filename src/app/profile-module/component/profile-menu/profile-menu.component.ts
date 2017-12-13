import { Component, OnInit } from '@angular/core';

import { ordertypes } from '../../profile.component';
import { MenuService } from '../../service/menu.service.';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

  menuindex: number;
  ordertypes = ordertypes;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.changeMenu$.subscribe(menuindex => this.menuindex = menuindex);
  }

}