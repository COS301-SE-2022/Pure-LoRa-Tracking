import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'master-add-device',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.scss'],
})
export class DeviceAddComponent implements OnInit {
  
  typeGroup!: FormGroup;
  descriptionGroup!: FormGroup;
  infoGroup!: FormGroup;

  deviceType = "";

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.typeGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.descriptionGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.infoGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }
}
