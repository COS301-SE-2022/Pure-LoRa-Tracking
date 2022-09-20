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

  aditionalInfo = {
    lastPing: "",
    park: "",
    animal: "",
    signals: 0,
    activeSince: "",
  }

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
    this.loaddata();
    this.notifier.getTimeStamps().subscribe(val=>{
      if(this.notifier.isTimeSet())this.loaddata({start:val.startTime,end:val.endTime})
    })
  }

  loaddata(timestamps?:{start:number,end:number}){
    let body:{deviceEUI:string,timeStart?:number,timeStop?:number}={
      "deviceEUI": this.sensorInfo.id
    }
    if(timestamps!=undefined){
      body={
        ...body,
        timeStart:new Date(timestamps.start).getTime(),
        timeStop:new Date(timestamps.end).getTime(),
      }
    }
    this.http.post("api/device/admin/sensordata", body).subscribe((val: any) => {
      const temp = [];
      console.log("data received ", val);
      const rawdata = val.data;
      const tempnames = Object.keys(rawdata).map((curr: string) => curr.startsWith("data_") ? curr.substring(5) : curr);
      this.colnames = tempnames;
      const joined: any = {};
      if (val.status == 200 && val.explanation == "ok") {
        for (const key in rawdata) {
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
      const commsdata: Array<any> = [];
      for (const key in joined) {
        if (Object.prototype.hasOwnProperty.call(joined, key)) {
          const currdate=new Date(parseInt(key));
          commsdata.push({ "date": currdate.toISOString().substring(5,10).replace("-","/"),"timestamp":parseInt(key),"time":`${currdate.getHours()}:${currdate.getMinutes()}`,"Full_Date": currdate.toString(), ...joined[key] });
        }
      }
      commsdata.sort((a,b)=>{return b.timestamp-a.timestamp});
      this.rawGraphdata = temp;//setting with a temp to trigger change detection
      this.tabledata = commsdata;//setting with a temp to trigger change detection
      console.log('commsdata :>> ', commsdata);
    })

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
