import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-breadcrumb',
  templateUrl: './profile-breadcrumb.component.html',
  styleUrls: ['./profile-breadcrumb.component.css']
})
export class ProfileBreadcrumbComponent implements OnInit {

  currAddress: string = '';

  constructor(
  ) {
    this.currAddress = JSON.parse(localStorage.getItem("locatedInfo")).address;
  }

  ngOnInit() {
  }

}
