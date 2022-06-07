import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'master-header-nav',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
})
export class HeaderUiComponent implements OnInit {

  logoLoc = "assets/Logos/navlogo.svg";

  constructor() {}

  ngOnInit(): void {}
}
