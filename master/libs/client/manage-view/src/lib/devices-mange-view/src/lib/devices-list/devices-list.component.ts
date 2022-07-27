import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface DeviceInterface {
  id: string;
  name: string;
}
export interface SensorInterface{
  id: string,
  name: string,
  reserve: string,
  status: string
}
@Component({
  selector: 'master-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
})

export class DevicesListComponent implements OnInit {

  tableColumns:string[] = ["id", "name","reserve","status","delete","edit"];
  // sensorData=[{
  //   id: "abc",
  //   name: "bcd",
  //   reserve: "2",
  //   status: "active"
  // },{
  //   id: "fcd",
  //   name: "dfg",
  //   reserve: "3",
  //   status: "inactive"
  // }];

  gatewayData=[{
    id: "as",
    name: "sd",
    reserve: "1",
    status: "active"
  },{
    id: "fcdfd",
    name: "dfd",
    reserve: "2",
    status: "inactive"
  }];

  sensorData:SensorInterface[] = [];

  reserveList:DeviceInterface[]=[];

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.http.post("api/user/admin/groups",{}).subscribe((val:any)=>{
      console.log(val);
      this.reserveList = val.data.data.map((curr:any)=>{
        return {
          name:curr.name,
          id:curr.id.id
        }
      });
      this.reserveList.forEach((curr)=>{
        this.http.post("api/map/historical",{
          reserveID:curr.id
        }).subscribe((val:any)=>{
          console.log(val);
          if(val.data.length>0){
          this.sensorData = this.sensorData.concat(val.data.map((other:any)=>{
            return {
              id:other.deviceID,
              name:other.deviceName,
              reserve:curr.id,
              status:"active"
            }
          }));
          }
        });
      })
    })
    this.http.post("api/device/available",{}).subscribe((val:any)=>{
      console.log(val);
    });
    
  }

  deleteDevice(id:string):void {
    console.log("Delete: " + id);
  }

  sensorReserveFilter(event:any): void {
    console.log(event);
  }

  gatewayReserveFilter(event:any): void {
    console.log(event);
  }

  changeDeviceStatus(event:any, type:string, id: string): void {
    console.log(type + ": "+ id +" changed to "+event.value);
  }

  reassignDevice(event:any, type:string, id: string): void {

  }
}
