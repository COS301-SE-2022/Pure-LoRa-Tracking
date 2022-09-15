import { EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceNotifierService } from '@master/client/shared-services';

@Component({
  selector: 'master-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})


export class MapPanelComponent implements OnInit{
  @Output() ShowPolygon=new EventEmitter<boolean>();
  @Output() ViewType=new EventEmitter<string>();
  // @Output() DateRange=new EventEmitter<{"start":number,"end":number}>();
  starttime="0";
  endtime="23";
  
 
  constructor(private notifier:DeviceNotifierService) {
    this.ShowPolygon.emit(true);
  }
  ngOnInit(): void {
    //check if a date is set
    // if(this.notifier.)
  }

  daterange = new FormGroup({
    startdateform: new FormControl(new Date(),[Validators.required]),
    enddateform: new FormControl(new Date(),[Validators.required]),
  });
  

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
    this.daterange.setValue({
      startdateform: new Date(),
      enddateform:new Date()
    });
    
    this.apply();//i think
  }

  apply():void{
    if(this.daterange.get("startdateform")!=undefined&&this.daterange.get("enddateform")!=undefined){
      const tempstart=(this.daterange.get("startdateform")?.value);
      if(tempstart!=undefined)tempstart.setHours(parseInt(this.starttime));
      const tempend=(this.daterange.get("enddateform")?.value);
      tempend.setHours(parseInt(this.endtime));
      this.notifier.setStartEndTime({
        startTime:tempstart,
        endTime:tempend
      });
    }
  }

}
