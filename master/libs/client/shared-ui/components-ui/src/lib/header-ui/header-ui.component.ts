import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'master-header-nav',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
})
export class HeaderUiComponent implements OnInit{
  logoLoc = "assets/Logos/logo.svg";
  admin=false;
  constructor(private cookieservice:CookieService, private router:Router){}

  ngOnInit() :void {
    let decoded:any;
    const cookie= this.cookieservice.get("PURELORA_TOKEN")
    if(cookie!=undefined&&cookie!=null&&cookie!="") decoded=jwt_decode(cookie);
    if(decoded?.scopes[0]=="TENANT_ADMIN") this.admin=true;
  }

  logout() {
    console.log("logout called");
    this.cookieservice.deleteAll();
    this.router.navigate(['']);
  }
}
