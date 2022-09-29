import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'master-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})

export class MapPanelComponent{
  @Output() ShowPolygon = new EventEmitter<boolean>();
  @Output() ViewType = new EventEmitter<string>();
  @Output() GatewayShow = new EventEmitter<boolean>();

  constructor() {
    this.ShowPolygon.emit(true);
  }

  updateBorder(newval: boolean) {
    this.ShowPolygon.emit(newval);
  }

  updateViewType(newval: string) {
    this.ViewType.emit(newval);
  }

  updateGateways(newval: boolean) {
    this.GatewayShow.emit(newval);
  }
}
