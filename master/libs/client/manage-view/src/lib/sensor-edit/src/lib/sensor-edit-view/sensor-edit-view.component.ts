import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'master-sensor-edit-view',
  templateUrl: './sensor-edit-view.component.html',
  styleUrls: ['./sensor-edit-view.component.scss'],
})
export class SensorEditViewComponent implements OnInit {

  sensorDetails = {
    name: ""
  };

  editSensor: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private formBuilder: UntypedFormBuilder, private router:Router) {

  }

  ngOnInit(): void {}
}
