import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapCallerService } from '@master/client/map-apicaller';
import { TokenManagerService } from '@master/client/user-storage-controller';
import { DialogConfirmationComponent } from '@master/client/shared-ui/components-ui';
import { DeviceNotifierService } from '@master/client/shared-services';
import { HttpClient } from '@angular/common/http';
import { data, string } from '@tensorflow/tfjs-node';

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
  public colnames: Array<string> = [];
  public tabledata: Array<any> = []

  //we need the contructor for injection, does not matter if its empty
  //eslint-disable-next-line no-empty
  constructor(private apicaller: MapCallerService, private http: HttpClient, private notifier: DeviceNotifierService) {
    console.log("placeholder until no empty is diabled")

  }

  ngOnInit(): void {
    this.http.post("api/device/admin/sensordata", {
      "deviceEUI": this.sensorInfo.id
    }).subscribe((val: any) => {
      let temp = [];
      console.log("data received ", val);
      const rawdata = val.data;
      const tempnames = Object.keys(rawdata).map((curr: string) => curr.startsWith("data_") ? curr.substring(5) : curr);
      this.colnames = tempnames;
      let joined: any = {};
      if (val.status == 200 && val.explanation == "ok") {
        for (let key in rawdata) {
          if (Object.prototype.hasOwnProperty.call(rawdata, key)) {
            if (key.startsWith("data_")) {
              temp.push(
                {
                  graphname: key.substring(5),
                  data: rawdata[key]?.map((curr: any) => {
                    //use this opportunity to grab the comms data
                    joined[curr.ts.toString()] = { ...joined[curr.ts.toString()], [key.substring(5)]: curr.value };
                    //return for the graph data
                    return {
                      name: new Date(curr.ts),
                      value: curr.value
                    }
                  })
                }
              )
            }
            else {
              //add to array if not in data_
              rawdata[key]?.forEach((curr: any) => {
                joined[curr.ts.toString()] = { ...joined[curr.ts.toString()], [key]: curr.value };
              })
            }
          }
        }
      }
      //convert joined to comms format
      let commsdata: Array<any> = [];
      for (const key in joined) {
        if (Object.prototype.hasOwnProperty.call(joined, key)) {
          const currdate=new Date(parseInt(key));
          commsdata.push({ "date": currdate.toISOString().substring(5,10).replace("-","/"),"timestamp":parseInt(key),"time":`${currdate.getHours()}:${currdate.getMinutes()}`,"Full_Date": currdate.toString(), ...joined[key] });
        }
      }
      commsdata=commsdata.sort((a,b)=>{return b.timestamp-a.timestamp});
      this.rawGraphdata = temp;//setting with a temp to trigger change detection
      this.tabledata = commsdata;//setting with a temp to trigger change detection
      console.log('commsdata :>> ', commsdata);
    })


    // const headersReq = {
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJ1c2VySWQiOiJmNzRjYmYzMC0wODNlLTExZWQtYmM2ZS1hNTAwNjJmNmNkYmEiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjYzNjczNjg2LCJleHAiOjE2NjM2ODI2ODYsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImVjODY0MzUwLTA4M2UtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAifQ.b4_l69ULFEcDTkpQlDzadPqzdfGw9CxVsLmsvm2r7U_mrIQaHFKiSW73MNGKzqRy_L4X7bxogRROQidv8SgqWg',
    // };
    // for(let i=10; i>1;i--){
    //   this.http.post("http://localhost:9090/api/plugins/telemetry/DEVICE/47af66c0-0840-11ed-bc6e-a50062f6cdba/timeseries/any",{
    //       "data_graph":Math.floor(Math.random()*900)+100,
    //       "data_graph2":Math.floor(Math.random()*900)+100
    //     },{headers:headersReq}).subscribe(val=>{
    //     console.log("val>> ",val);
    //   })
    // }

  }

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

  locateSensor(): void {
    this.notifier.locateSensor(this.sensorInfo.id);
  }

  showActivity(): void {
    console.log("placeholder");
  }

}
