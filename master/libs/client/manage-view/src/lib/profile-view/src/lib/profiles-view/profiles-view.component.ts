import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'master-profiles-view',
  templateUrl: './profiles-view.component.html',
  styleUrls: ['./profiles-view.component.scss'],
})

export class ProfilesViewComponent implements OnInit {
 
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

  ngOnInit(): void {
    console.log("profile");
  }

  openEdit():void {
    this.router.navigate(['manage',{outlets:{managecontent:['editprofile']}}]);   
  }
}
