import { Component, OnInit, Input } from '@angular/core';
import { Gateway } from '@master/shared-interfaces';

@Component({
  selector: 'master-gateway-view-detail',
  templateUrl: './gateway-view-detail.component.html',
  styleUrls: ['./gateway-view-detail.component.scss'],
})
export class GatewayViewDetailComponent implements OnInit {
  @Input() gatewayInfo: Gateway;

  constructor() {
    this.gatewayInfo = {
      eui: "",
      id: "",
      name: "",
      location: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  ngOnInit(): void {}
}
