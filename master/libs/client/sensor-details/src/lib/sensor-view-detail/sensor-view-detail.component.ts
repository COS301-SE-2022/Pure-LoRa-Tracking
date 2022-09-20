import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapCallerService } from '@master/client/map-apicaller';
import { TokenManagerService } from '@master/client/user-storage-controller';
import { DialogConfirmationComponent } from '@master/client/shared-ui/components-ui';
import { DeviceNotifierService } from '@master/client/shared-services';
import { HttpClient } from '@angular/common/http';
import { string } from '@tensorflow/tfjs-node';

@Component({
  selector: 'master-sensor-view-detail',
  templateUrl: './sensor-view-detail.component.html',
  styleUrls: ['./sensor-view-detail.component.scss'],
})
export class SensorViewDetailComponent implements OnInit {

  @Input() openView = false;
  @Input() sensorInfo = {
    name: "",
    id: "",
  };

  @Output() viewChange = new EventEmitter<boolean>();

  public rawGraphdata: Array<{ graphname: string, data: Array<{ name: string, value: string }> }> = [];

  //we need the contructor for injection, does not matter if its empty
  //eslint-disable-next-line no-empty
  constructor(private apicaller: MapCallerService, private http: HttpClient, private notifier: DeviceNotifierService) {
    console.log("placeholder until no empty is diabled")

  }


  ngOnInit(): void {
    this.http.post("api/device/admin/sensordata", {
      "deviceEUI": this.sensorInfo.id
    }).subscribe((val: any) => {
      let temp=[];
      console.log("dATA received ", val);
      if (val.status == 200 && val.explanation == "ok") {
        for (let key in val.data) {
          if (key.startsWith("data_")) {
            temp.push(
              {
                graphname: key.substring(5),
                data: val.data[key]?.map((curr: any) => {
                  return {
                    name: new Date(curr.ts),
                    value: curr.value
                  }
                })
              }
            )
          }
        }
      }
      this.rawGraphdata=temp;//setting with a temp to trigger change detection
    })


    // const headersReq = {
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJ1c2VySWQiOiJmNzRjYmYzMC0wODNlLTExZWQtYmM2ZS1hNTAwNjJmNmNkYmEiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjYzNjY0Njc0LCJleHAiOjE2NjM2NzM2NzQsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImVjODY0MzUwLTA4M2UtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAifQ.uL_zAJFo5EBJWEKCUIgf6gPBpq3m_bNSZJVYjYmXlIzTVM1JWdPOt9KX_MlFRmwH43u_I-N21pICcJrFbA7jig',
    // };
    // for(let i=10; i>1;i--){
    //   this.http.post("http://localhost:9090/api/plugins/telemetry/DEVICE/47af66c0-0840-11ed-bc6e-a50062f6cdba/timeseries/any",{
    //       "data_graph":Math.floor(Math.random()*900)+100
    //     },{headers:headersReq}).subscribe(val=>{
    //     console.log("val>> ",val);
    //   })
    // }

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

  closeSensor(): void {
    this.openView = false;
    this.viewChange.emit(this.openView);
  }

  // deleteSensor():void{
  //   const mydialog=this.dialogcontroller.open(DialogConfirmationComponent,{
  //     data: {
  //       title: 'Confirm Delete',
  //       dialogMessage: 'Are you sure you want to delete Sensor: '+this.sensorInfo.id+'?  NOTE: THIS ACTION CANNOT BE REVERSED!',
  //     },
  //   })
  //   mydialog.afterClosed().subscribe(val=>{
  //     if(val){
  //       this.apicaller.removeDevice(this.sensorInfo.id,this.sensorInfo.name,false).then(curr=>{
  //         //TODO change alert to proper pop up @brandon-c-k
  //         if(curr.status==200&&curr.explanation=="ok"){
  //           alert("Device deleted");
  //           this.notifier.deleteSensor(this.sensorInfo.id)
  //           this.closeSensor();
  //         }
  //         else {
  //           console.log(curr)
  //           alert("Something went wrong");
  //         }
  //       });
  //     }
  //   })
  // }

  locateSensor(): void {
    this.notifier.locateSensor(this.sensorInfo.id);
  }

  showActivity(): void {
    console.log("placeholder");
  }

}
