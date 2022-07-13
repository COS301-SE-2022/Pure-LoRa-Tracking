import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'master-device-list-item',
  templateUrl: './device-list-item.component.html',
  styleUrls: ['./device-list-item.component.scss'],
})
export class DeviceListItemComponent implements OnInit {
  @Input() deviceName = "";
  @Input() deviceId = "";
  @Input() deviceType = "";
  constructor() {}

  ngOnInit(): void {}
}
