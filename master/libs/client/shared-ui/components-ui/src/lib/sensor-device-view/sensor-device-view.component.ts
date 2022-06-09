import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';
import { Component, EventEmitter, OnInit, Output ,  Inject} from '@angular/core';
import { SensorProfile } from '@master/shared-interfaces';


export interface sensorInfo {
  name: string,
  id: string,
}

@Component({
  selector: 'master-sensor-device-view',
  templateUrl: './sensor-device-view.component.html',
  styleUrls: ['./sensor-device-view.component.scss'],
})
export class SensorDeviceViewComponent implements OnInit {
  @Output() closeOverlay = new EventEmitter<void>();
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

  isOpen = false;
  
  mydATA: sensorInfo;

  constructor(@Inject("OVERLAY_DATA") public data: any) {
    this.mydATA = data;
  }

  ngOnInit(): void {}

  closeSensor():void {
    this.closeOverlay.emit();
  }
}
