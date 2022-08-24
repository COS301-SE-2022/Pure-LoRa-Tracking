import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapCallerService } from '@master/client/map-apicaller';
import { TokenManagerService } from '@master/client/user-storage-controller';
import { SensorProfile,  } from '@master/shared-interfaces';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { DeviceNotifierService } from '@master/client/shared-services';
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

  //we need the contructor for injection, does not matter if its empty
  //eslint-disable-next-line no-empty
  constructor(private apicaller:MapCallerService,private tokenManager:TokenManagerService,private dialogcontroller:MatDialog,private notifier:DeviceNotifierService){
    console.log("placeholder until no empty is diabled")
  }

  // sensorInformation:SensorProfile = {
  //   profileID: "13456",
  //   profileName: "S-123",
  // }

  aditionalInfo = {
    lastPing: "",
    park: "",
    animal: "",
    signals: 0,
    activeSince: "",
  }

 // view: [number,number]= [400, 200];

  // options
  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Heart Rate (bpm)';
  timeline = true;
  yScaleMin = 0;

  closeSensor():void {
    this.openView = false; 
    this.viewChange.emit(this.openView);
  }

  deleteSensor():void{
    const mydialog=this.dialogcontroller.open(DialogConfirmationComponent,{
      data: {
        title: 'Confirm Delete',
        dialogMessage: 'Are you sure you want to delete Sensor: '+this.sensorInfo.id+'?  NOTE: THIS ACTION CANNOT BE REVERSED!',
      },
    })
    mydialog.afterClosed().subscribe(val=>{
      if(val){
        this.apicaller.removeDevice(this.sensorInfo.id,this.sensorInfo.name,false).then(curr=>{
          //TODO change alert to proper pop up @brandon-c-k
          if(curr.status==200&&curr.explanation=="ok"){
            alert("Device deleted");
            this.notifier.deleteSensor(this.sensorInfo.id)
            this.closeSensor();
          }
          else {
            console.log(curr)
            alert("Something went wrong");
          }
        });
      }
    })
  }

  locateSensor():void{
    this.notifier.locateSensor(this.sensorInfo.id);
  }

  showActivity():void{
    console.log("placeholder");
  }

}
