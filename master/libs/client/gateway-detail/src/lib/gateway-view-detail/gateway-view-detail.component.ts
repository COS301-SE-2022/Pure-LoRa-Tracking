import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { Gateway } from '@master/shared-interfaces';

@Component({
  selector: 'master-gateway-view-detail',
  templateUrl: './gateway-view-detail.component.html',
  styleUrls: ['./gateway-view-detail.component.scss'],
})
export class GatewayViewDetailComponent {
  @Input() gatewayInfo: Gateway;
  @Input() openView = false;

  @Output() viewChange = new EventEmitter<boolean>();

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

  closeGateway():void {
    this.openView = false;
    this.viewChange.emit(this.openView);
  }
}
