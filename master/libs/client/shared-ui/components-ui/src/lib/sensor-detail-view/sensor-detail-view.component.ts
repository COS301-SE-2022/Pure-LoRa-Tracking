import { Component, OnInit } from '@angular/core';
import { SensorProfile } from '@master/shared-interfaces';

@Component({
  selector: 'master-sensor-detail-view',
  templateUrl: './sensor-detail-view.component.html',
  styleUrls: ['./sensor-detail-view.component.scss'],
})
export class SensorDetailViewComponent implements OnInit {
  sensorInformation:SensorProfile = {
    profileID: "13456",
    profileName: "S-123",
  }

  aditionalInfo = {
    lastPing: "",
    park: "",
    animal: "",
    signals: 0,
    activeSince: "",
  }
 
  constructor() {}

  ngOnInit(): void {}

  closeSensor():void {
    console.log("Close");
  }
}
