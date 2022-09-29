import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'master-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss'],
})
export class ManagePageComponent implements OnInit {
  manageCase = "profile";
  admin=false;
  constructor(private router: Router,private route: ActivatedRoute,private cookieservice:CookieService) {}
  
  ngOnInit(): void {
    let decoded:any;
    const cookie= this.cookieservice.get("PURELORA_TOKEN")
    if(cookie!=undefined&&cookie!=null&&cookie!="") decoded=jwt_decode(cookie);
    if(decoded?.scopes[0]=="TENANT_ADMIN") this.admin=true;
  }
  

}
