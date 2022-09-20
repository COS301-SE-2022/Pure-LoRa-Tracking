import { Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

const TABLE_DATA = [
  {
      id: "abc",
      name: "ABC",
      date: "11/04/2022",
      time: "11:24",
      gateway: "G2",
      temperature: 2,
      heartrate: 80,
      location:{
        long: 1,
        lat: 1
      }
    
  },
  {
      id: "abc",
      name: "ABC",
      date: "11/04/2022",
      time: "11:24",
      gateway: "G2",
      temperature: 2,
      heartrate: 80,
      location:{
        long: 1,
        lat: 1
      }
  }
];


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


export class SensorCommunicationComponent {
 

  private _colnames:Array<string>=[];
  @Input()
  public get colnames() : string[] {
    return this._colnames;
  }
  public set colnames(v : string[]) {
    this._colnames = v;
    console.log('this.colnames :>> ', this.colnames);
    this.columnsToDisplay=this._colnames
  }
  
  

  dataSource = TABLE_DATA;

  columnsToDisplay:Array<string> = [];
  expandedElm = null;

  getPrettyColumn(column: string): string {
    return column.charAt(0).toUpperCase()+column.slice(1);
  }

}
