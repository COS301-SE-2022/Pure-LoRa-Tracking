import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

export interface SensorProps {
  name: string;
  id: string;
  last: Date;
}

export interface GatewayProps {
  name: string;
  id: string;
  last: Date;
}

@Component({
  selector: 'master-reserve-panel',
  templateUrl: './reserve-panel.component.html',
  styleUrls: ['./reserve-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ReservePanelComponent implements OnInit {
  
  reserveName = "Reserve Name";
  sensors: SensorProps[] = [
    {
      name: "Sensor A",
      id: "45aasd2334d",
      last: new Date('1/1/16'),
    },
    {
      name: "Sensor B",
      id: "asda4234",
      last: new Date('2/1/16'),
    },
    {
      name: "Sensor C",
      id: "45aasgdas",
      last: new Date('1/1/16'),
    },{
      name: "Sensor D",
      id: "gfjggjgdfg",
      last: new Date('3/1/16'),
    }
  ];

  gateways: GatewayProps[] = [
    {
      name: "Gateway A",
      id: "45ad2334d",
      last: new Date('1/1/16'),
    },
    {
      name: "Gateway B",
      id: "asda34",
      last: new Date('2/1/16'),
    },
    {
      name: "Gateway C",
      id: "45agdas",
      last: new Date('1/1/16'),
    },{
      name: "Gateway D",
      id: "gfjggdfg",
      last: new Date('3/1/16'),
    }
  ];

  deviceType = "sensors";
  selectedDevices: string[] = [];
  searchString = "";
  filteredGateways:GatewayProps[]|undefined=[];

  filteredSensors:SensorProps[]|null=[];

  // constructor() {}

  getSelectedStyle(deviceId:string):string{
    if (this.selectedDevices.includes(deviceId)){
      return "#deeffd";
    }
    return "";
  }

  selectedDevice(deviceList:MatSelectionList){
    if (deviceList && deviceList._value){
      this.selectedDevices = deviceList._value.map(deviceId => deviceId);
    }
  }

  searchDevices():void{
     const searchLower = this.searchString.toLocaleLowerCase();
     this.filteredGateways = this.gateways.filter(gatewayItem => gatewayItem.id.toLocaleLowerCase().search(searchLower)>=0);
     this.filteredSensors = this.sensors.filter(sensorItem=> sensorItem.id.toLocaleLowerCase().search(searchLower)>=0);
      console.log(this.filteredGateways);
    }


  ngOnInit(): void {
    this.filteredGateways = this.gateways.map(gatewayItem => {return gatewayItem;})
    this.filteredSensors = this.sensors.map(sensorItem => {return sensorItem;})
  }
}
