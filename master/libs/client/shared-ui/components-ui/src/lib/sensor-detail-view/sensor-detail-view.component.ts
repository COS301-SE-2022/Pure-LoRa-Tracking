import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { SensorProfile,  } from '@master/shared-interfaces';

@Component({
  selector: 'master-sensor-detail-view',
  templateUrl: './sensor-detail-view.component.html',
  styleUrls: ['./sensor-detail-view.component.scss'],
})
export class SensorDetailViewComponent {

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

  closeSensor():void {
    this.openView = false;
    this.viewChange.emit(this.openView);
  }
}
