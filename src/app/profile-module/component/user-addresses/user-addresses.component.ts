import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.sethMenuIndex(2);
  }
}
