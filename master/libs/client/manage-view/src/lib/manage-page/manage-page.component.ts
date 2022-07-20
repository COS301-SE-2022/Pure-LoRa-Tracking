import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'master-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss'],
})
export class ManagePageComponent implements OnInit {
  manageCase = "profile";
  constructor() {}

  ngOnInit(): void {}

  viewUsers():void {
    this.manageCase = 'users';
  }

  viewProfile():void {
    this.manageCase = 'profile';
  }

  viewDevices():void {
    this.manageCase = 'devices';
  }

  viewReserves():void {
    this.manageCase = 'reserves';
  }
}
