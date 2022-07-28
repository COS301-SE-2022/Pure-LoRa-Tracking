import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface DeviceInterface {
  id: string;
  name: string;
}
export interface SensorGatewayInterface{
  id: string,
  name: string,
  reserve: string,
  status: boolean
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

  // gatewayData=[{
  //   id: "as",
  //   name: "sd",
  //   reserve: "1",
  //   status: "active"
  // },{
  //   id: "fcdfd",
  //   name: "dfd",
  //   reserve: "2",
  //   status: "inactive"
  // }];

  gatewayData:SensorGatewayInterface[] = [];

  sensorData:SensorGatewayInterface[] = [];

  reserveList:DeviceInterface[]=[];

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.http.post("api/user/admin/groups",{}).subscribe((val:any)=>{
      // console.log(val);
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
          // console.log(val);
          if(val.data.length>0){
          this.sensorData = this.sensorData.concat(val.data.map((other:any)=>{
            return {
              id:other.deviceID,
              name:other.deviceName,
              reserve:curr.id,
              status:true
            }
          }));
          }
        });

        this.http.post("/api/device/gateway/info",{
          customerID:curr.id
        }).subscribe((val:any)=>{
          // console.log('val :>> ', val);
          this.gatewayData=this.gatewayData.concat(val.data.map((other:any)=>{
            return {
              id:other.deviceID,
              name:other.deviceName,
              reserve:curr.id,
              status:true
            }
          }));
        })
      })
    })
    this.http.post("api/device/available",{}).subscribe((val:any)=>{
      console.log("curr",val);
      if(val.data!=undefined){
      this.sensorData=this.sensorData.concat(val.data.filter((curr:any)=>!curr.isGateway).map((curr:any)=>{
        return {
          id:curr.deviceID,
          name:curr.deviceName,
          reserve:"",
          status:false
        }
      }));
      this.gatewayData=this.gatewayData.concat(val.data.filter((curr:any)=>curr.isGateway).map((curr:any)=>{
        return {
          id:curr.deviceID,
          name:curr.deviceName,
          reserve:"",
          status:false
        }
      }));

    }
    });

  }

  deleteDevice(id:string):void {
    console.log("Delete: " + id);
  }

  // sensorReserveFilter(event:any): void {
  //   console.log(event);
  // }

  // gatewayReserveFilter(event:any): void {
  //   console.log(event);
  // }

  // changeDeviceStatus(event:any, type:string, id: string): void {
  //   console.log(type + ": "+ id +" changed to "+event.value);
  // }

  // reassignDevice(event:any, type:string, id: string): void {

  // }

  unassign(id:string):void{
    this.http.post("api/device/unassign",{
      deviceID:id
    }).subscribe((val:any)=>{
      console.log(val);
    });

  }
  
  assign(id:string,reserveid:string):void{
    this.http.post("api/device/assign",{
      deviceID:id,
      customerID:reserveid
    }).subscribe((val:any)=>{
      console.log(val);
    }); 
  }

  reassign(id:string,reserveid:string,other:string):void{
    console.log("first "+reserveid+" "+reserveid+" "+other);
  }
}
