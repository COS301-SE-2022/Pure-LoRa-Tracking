import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'master-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
})
export class DevicesListComponent implements OnInit {

  tableColumns:string[] = ['id', 'name',"status","delete","edit"];
  sensorData=[{
    id: "abc",
    name: "bcd",
    status: "active"
  },{
    id: "fcd",
    name: "dfg",
    status: "inactive"
  }];

  gatewayData=[{
    id: "as",
    name: "sd",
    status: "active"
  },{
    id: "fcdfd",
    name: "dfd",
    status: "inactive"
  }];

  reserveList=[{name:"A", id:1},{name:"B",id:2},{name:"C",id:3}];

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
}
