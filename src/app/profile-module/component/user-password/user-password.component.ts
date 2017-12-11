import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service.';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.currentMenu(3);
  }

}
