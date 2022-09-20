import { Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
    let myarr=['date','time',...this._colnames];
    myarr.length=Math.min(myarr.length,5);//limit the amount of columns shown
    this.columnsToDisplay=myarr;
  }

  private _tabledata:Array<any>=[];
  @Input()
  public get tabledata() : Array<any> {
    return this._tabledata;
  } 
  public set tabledata(v : Array<any>) {
    this._tabledata = v;
    this.dataSource= v;
  }


  dataSource:Array<any> = [];

  columnsToDisplay:Array<string> = [];
  expandedElm = null;

  getPrettyColumn(column: string): string {
    
    return column.charAt(0).toUpperCase()+column.slice(1);
  }

}
