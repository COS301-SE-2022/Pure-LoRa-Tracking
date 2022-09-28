import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DeviceNotifierService } from '@master/client/shared-services';

@Component({
  selector: 'master-date-time-selection',
  templateUrl: './date-time-selection.component.html',
  styleUrls: ['./date-time-selection.component.scss'],
})
export class DateTimeSelectionComponent implements OnInit {
  // @Output() DateRange=new EventEmitter<{"start":number,"end":number}>();

  starttime = "0";
  endtime = "23";

  daterange = new UntypedFormGroup({
    startdateform: new UntypedFormControl(new Date(),[Validators.required]),
    enddateform: new UntypedFormControl(new Date(),[Validators.required]),
  });

  constructor(public notifier: DeviceNotifierService) {}

  ngOnInit(): void {
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
