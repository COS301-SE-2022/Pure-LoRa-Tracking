import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {deviceOptionList} from "@master/shared-interfaces"
@Component({
  selector: 'master-add-device',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.scss'],
})

export class DeviceAddComponent implements OnInit {
  
  typeGroup!: FormGroup;
  descriptionGroup!: FormGroup;
  infoGroup!: FormGroup;
  gatewayGroup!:FormGroup;
  sensorGroup!:FormGroup;
  profilelist:Array<deviceOptionList>=[];

  deviceType = "";

  constructor(private _formBuilder: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {
    this.typeGroup = this._formBuilder.group({
      type: ['', Validators.required],
    });
    this.descriptionGroup = this._formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
    });
    this.gatewayGroup = this._formBuilder.group({
      gatwayid: ['', Validators.required],
      networkserver: ['', Validators.required],
      location: ['', Validators.required],
    });
    this.sensorGroup=this._formBuilder.group({
      eui: ['', Validators.required],
      applicationkey: ['', Validators.required],
      profilegroup: ['', Validators.required],
    })

    this.http.post("/api/user/admin/groups",{
      "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImM1M2ZlNDAwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImIwMTNhOWUwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY1NDcxODAyOCwiZXhwIjoxNjU0NzI3MDI4fQ.82IjvClcKrGKy756rBD9umeAKJSURoCRccsOGD3LcxSbmtRJPePguYSU-fLRxV-8pRsCeVtg9UFsZbCuocv3Og"
    }).subscribe((val:any)=>{
      console.log(val);
      if(val.status==200){
        val.data.forEach((curr:any)=>{
          this.profilelist.push({
            deviceID:curr.id.id,
            name:curr.title
          } as deviceOptionList)
        })
      }
    })
  }

  update(){
    console.log("add user")
  }
}
