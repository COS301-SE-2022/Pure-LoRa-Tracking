import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapCallerService } from '@master/client/map-apicaller';
import { TokenManagerService } from '@master/client/user-storage-controller';
import { SensorProfile,  } from '@master/shared-interfaces';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

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
  @Output() deviceDeleted = new EventEmitter<string>();

  //we need the contructor for injection, does not matter if its empty
  //eslint-disable-next-line no-empty
  constructor(private apicaller:MapCallerService,private tokenManager:TokenManagerService,private dialogcontroller:MatDialog){
    console.log("placeholder until no empty is diabled")
  }

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

  deleteSensor():void{
    console.log("test");
    const mydialog=this.dialogcontroller.open(DialogConfirmationComponent,{
      data: {
        title: 'Confirm Delete',
        dialogMessage: 'Are you sure you want to delete Sensor: '+this.sensorInfo.id+'?  NOTE: THIS ACTION CANNOT BE REVERSED!',
      },
    })
    mydialog.afterClosed().subscribe(val=>{
      if(val){
        this.apicaller.removeDevice(this.tokenManager.getAdminToken(),this.sensorInfo.id,this.sensorInfo.name,false).then(curr=>{
          //TODO change alert to proper pop up @brandon-c-k
          if(curr.status==200&&curr.explanation=="ok"){
            alert("Device deleted");
            this.deviceDeleted.emit(this.sensorInfo.id);
            this.closeSensor();
          }
          else {
            alert("Something went wrong");
          }
        });
      }
    })
  }

}
