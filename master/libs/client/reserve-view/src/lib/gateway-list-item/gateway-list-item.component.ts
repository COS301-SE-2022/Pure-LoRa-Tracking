import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Gateway } from '@master/shared-interfaces';

@Component({
  selector: 'master-gateway-list-item',
  templateUrl: './gateway-list-item.component.html',
  styleUrls: ['./gateway-list-item.component.scss'],
})
export class GatewayListItemComponent  {
  @Input() gateway: Gateway;
  @Output() openGatewayView = new EventEmitter<{"id":string,"name":string}>();
  @Output() locateGateway = new EventEmitter<string>();
  @Output() gatewayExpanded = new EventEmitter();

  constructor() {
    this.gateway = {
      eui: "",
      id: "",
      name: "",
      location:{
        latitude: 0,
        longitude: 0
  
      }
    }
  }

  openGateway(): void {
    this.openGatewayView.emit({
      id: this.gateway.id,
      name: this.gateway.name,
    })
  }
  
  locateOnMap(): void {
    this.locateGateway.emit(this.gateway.id);
  }

  itemExpand(): void{
    this.gatewayExpanded.emit();
  }

}
