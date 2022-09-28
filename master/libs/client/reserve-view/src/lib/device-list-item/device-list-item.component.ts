import { Component, Input, Output,EventEmitter } from '@angular/core';
import { DeviceNotifierService } from '@master/client/shared-services';
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
  constructor(private notifer:DeviceNotifierService) {
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

  showHistory = true;
  visibilityIcon = 'visibility';
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

  toggleHistory(event:any,deviceid:string):void{
    //prevents expansion panel expand
    event.stopPropagation();
    this.visibilityIcon = this.showHistory ? 'visibility_off' : 'visibility';
    this.showHistory = !this.showHistory;
    this.notifer.VisibilityChange.emit({
      deviceid:deviceid,
      hide:!this.showHistory});

  }
}
