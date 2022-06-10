import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SensorProfile, Device } from '@master/shared-interfaces';

@Component({
  selector: 'master-sensor-detail-view',
  templateUrl: './sensor-detail-view.component.html',
  styleUrls: ['./sensor-detail-view.component.scss'],
})
export class SensorDetailViewComponent implements OnInit {

  @Input() openView = false;
  @Input() sensorInfo = {
    name: "",
    id: "",
  };

  @Output() viewChange = new EventEmitter<boolean>();

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
    this.openView = false;
    this.viewChange.emit(this.openView);
  }
}
