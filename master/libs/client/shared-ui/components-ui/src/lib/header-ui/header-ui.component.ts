import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'master-header-nav',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
})
export class HeaderUiComponent implements OnInit{
  logoLoc = "assets/Logos/logo.svg";

  constructor(private cookieservice:CookieService, private router:Router){}

  ngOnInit() :void {
    return;
  }

  logout() {
    this.cookieservice.deleteAll();
    this.router.navigate(['']);
  }
}
