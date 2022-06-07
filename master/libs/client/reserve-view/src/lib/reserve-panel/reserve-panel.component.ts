import { Component, OnInit } from '@angular/core';

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
      id: "45aasd2334d",
      last: new Date('1/1/16'),
    },
    {
      name: "Gateway B",
      id: "asda4234",
      last: new Date('2/1/16'),
    },
    {
      name: "Gateway C",
      id: "45aasgdas",
      last: new Date('1/1/16'),
    },{
      name: "Gateway D",
      id: "gfjggjgdfg",
      last: new Date('3/1/16'),
    }
  ];

  deviceType = "sensors";
  
  constructor() {}

  ngOnInit(): void {}
}
