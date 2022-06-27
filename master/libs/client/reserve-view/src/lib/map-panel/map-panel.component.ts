import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'master-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent {
  @Output() ShowPolygon=new EventEmitter<boolean>();
  @Output() ViewType=new EventEmitter<string>();
  @Output() StartDateOutput=new EventEmitter<Date>();
  @Output() EndDateOutput=new EventEmitter<Date>();
  starttime="0";
  endtime="23";
  startdate=new FormControl(new Date());
  enddate=new FormControl(new Date());
  constructor() {
    this.ShowPolygon.emit(true);
  }

  updateBorder(newval:boolean){
    this.ShowPolygon.emit(newval);
  }

  updateViewType(newval:string){
    this.ViewType.emit(newval);
  }
  // ngOnInit(): void {
  
  // }

  reset():void{
    this.starttime="0";
    this.endtime="23";
    this.startdate=new FormControl(new Date());
    this.enddate=new FormControl(new Date());
    this.apply();//i think
  }

  apply():void{
    //TODO emit event
  }

}
