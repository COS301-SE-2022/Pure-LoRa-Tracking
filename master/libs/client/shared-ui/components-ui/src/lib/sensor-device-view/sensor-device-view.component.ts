import { Component, OnInit } from '@angular/core';
import { SensorProfile } from '@master/shared-interfaces';


@Component({
  selector: 'master-sensor-device-view',
  templateUrl: './sensor-device-view.component.html',
  styleUrls: ['./sensor-device-view.component.scss'],
})
export class SensorDeviceViewComponent implements OnInit {
  sensorInformation:SensorProfile = {
    profileID: "13456",
    profileName: "S-123",
  }

  aditionalInfo = {
    lastPing: "01 Mayb 2022 10:22 AM",
    park: "Nature Reserve",
    animal: "Zebra",
    signals: 22,
    activeSince: "01 June 2021",
  }
  
  constructor() {}

  ngOnInit(): void {}
}
