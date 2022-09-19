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


export class MapPanelComponent implements OnInit {
  @Output() ShowPolygon = new EventEmitter<boolean>();
  @Output() ViewType = new EventEmitter<string>();
  // @Output() DateRange=new EventEmitter<{"start":number,"end":number}>();
  starttime = "0";
  endtime = "23";


  constructor(public notifier: DeviceNotifierService) {
    this.ShowPolygon.emit(true);
  }
  daterange = new FormGroup({
    startdateform: new FormControl(new Date(), [Validators.required]),
    enddateform: new FormControl(new Date(), [Validators.required]),
  });

  ngOnInit(): void {
    //check if a date is set
    if (this.notifier.isTimeSet()) {
      this.starttime = new Date(this.notifier.getTimeStampsValue().startTime).getHours().toString();
      this.endtime = new Date(this.notifier.getTimeStampsValue().endTime).getHours().toString();
      this.daterange.get("startdateform")?.setValue(this.notifier.getTimeStampsValue().startTime);
      this.daterange.get("enddateform")?.setValue(this.notifier.getTimeStampsValue().endTime);
    }
    else {
      this.resetDateView();
    }
  }


  updateBorder(newval: boolean) {
    this.ShowPolygon.emit(newval);
  }

  updateViewType(newval: string) {
    this.ViewType.emit(newval);
  }
  // ngOnInit(): void {

  // }

  resetDateView() {
    const endpoint = new Date();//current timestamp
    const startpoint = new Date((new Date().setDate(endpoint.getDate() - 1)));//one day back
    this.starttime = startpoint.getHours().toString();
    this.endtime = endpoint.getHours().toString();
    this.daterange.setValue({
      startdateform: startpoint,
      enddateform: endpoint
    });
  }

  reset(): void {
    //get last 24 hours
    this.resetDateView();
    this.apply();//i think
  }

  apply(): void {
    if (this.daterange.get("startdateform") != undefined && this.daterange.get("enddateform") != undefined) {
      const tempstart = (this.daterange.get("startdateform")?.value);
      if (tempstart != undefined) tempstart.setHours(parseInt(this.starttime));
      console.log("thign", tempstart);
      const tempend = (this.daterange.get("enddateform")?.value);
      tempend.setHours(parseInt(this.endtime));
      this.notifier.setStartEndTime({
        startTime: tempstart,
        endTime: tempend
      });

    }
  }

}
