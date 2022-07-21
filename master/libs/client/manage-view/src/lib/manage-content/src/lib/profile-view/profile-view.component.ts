import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'master-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  name:string;
  role:string;
  email:string;
  reserves:string[];

  constructor(private router:Router) {
    this.name = "Name Surname";
    this.role = "Admin";
    this.email = "reserve@reserve.com";
    this.reserves = ["Reserve A", "Reserve B"];
  }

  ngOnInit(): void {}

  openEdit():void {
    this.router.navigate(['manage',{outlets:{managecontent:['editprofile']}}]);   
  }
}
