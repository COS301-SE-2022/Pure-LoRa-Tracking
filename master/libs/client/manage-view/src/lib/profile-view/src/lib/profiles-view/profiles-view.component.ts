import { HttpClient } from '@angular/common/http';
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
  id:string;
  constructor(private router:Router,private http:HttpClient) {
    this.name = "Loading";
    this.role = "Loading";
    this.email = "Loading";
    this.id="Loading";
  }

  ngOnInit(): void {
    console.log("profile");
    this.http.post("api/user/info",{}).subscribe((val:any)=>{
      console.log(val);
      this.name=val.data.firstName+" "+val.data.lastName;
      this.email=val.data.email;
      this.role=val.data.authority;
      this.id=val.data.id.id
    })

  }

  openEdit():void {
    this.router.navigate(['manage',{outlets:{managecontent:['editprofile']}}]);   
  }
}
