import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Device } from '@master/shared-interfaces';
@Component({
  selector: 'master-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.scss'],
})
export class DeviceListItemComponent {
  @Input() device:Device;
  @Output() openDeviceView = new EventEmitter<{"id":string,"name":string}>();
  @Output() locateDevice = new EventEmitter<string>();
  @Output() itemExpanded = new EventEmitter();
  constructor() {
    this.device = {
      deviceID: "",
      deviceName: "",
      type: "",
      locationData: [{
        timeStamp: 0,
        latitude: "",
        longitude: "",
      }]
    }
  }

  //ngOnInit(): void {}

  openDevice(): void {
    this.openDeviceView.emit({
      id: this.device.deviceID,
      name: this.device.deviceName,
    })
  }

  locateOnMap(): void {
    this.locateDevice.emit(this.device.deviceID);
  }

  itemExpand(): void{
    this.itemExpanded.emit();
  }
}
