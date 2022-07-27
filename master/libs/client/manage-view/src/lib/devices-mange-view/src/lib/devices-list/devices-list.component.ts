import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'master-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
})
export class DevicesListComponent implements OnInit {

  tableColumns:string[] = ["id", "name","reserve","status","delete","edit"];
  sensorData=[{
    id: "abc",
    name: "bcd",
    reserve: "2",
    status: "active"
  },{
    id: "fcd",
    name: "dfg",
    reserve: "3",
    status: "inactive"
  }];

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

  reserveList=[{name:"A", id:"1"},{name:"B",id:"2"},{name:"C",id:"3"}];

  constructor() {}

  ngOnInit(): void {
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
