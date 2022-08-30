import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

const TABLE_DATA = [
  {
      id: "abc",
      name: "ABC",
      date: "11/04/2022",
      time: "11:24",
      gateway: "G2",
      temperature: 2,
      heartrate: 80
    
  },
  {
      id: "abc",
      name: "ABC",
      date: "11/04/2022",
      time: "11:24",
      gateway: "G2",
      temperature: 2,
      heartrate: 80
  }
];

const prettyColumnNames = {
      'date': "Date",
      'time': "Time",
      'gateway': "Gateway",
      'temperature': "Temp (\xB0C)",
      'heartrate': "Heart Rate (bpm)"
}

@Component({
  selector: 'master-sensor-communication',
  templateUrl: './sensor-communication.component.html',
  styleUrls: ['./sensor-communication.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class SensorCommunicationComponent implements OnInit {
 
  dataSource = TABLE_DATA;

  columnsToDisplay = ['date','time', 'gateway', 'temperature', 'heartrate'];
  expandedElm = null;
  constructor() {
  }
  

  ngOnInit(): void {}

  getPrettyColumn(column: string): string {
    const prettyName = prettyColumnNames[column as keyof typeof prettyColumnNames] as string;
    return prettyName?.length > 0 ? prettyName : column;
  }

}
