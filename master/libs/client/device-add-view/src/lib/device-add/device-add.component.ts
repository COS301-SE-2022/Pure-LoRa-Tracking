import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddGatewayDevice, AddSensorDevice } from '@master/shared-interfaces';
import {TokenManagerService} from "@master/client/user-storage-controller"
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
  deviceprofilelist:Array<{id: string, name: string}>=[];
  deviceType = "";
  constructor(private _formBuilder: FormBuilder,private http:HttpClient,private tokenmanager:TokenManagerService) {}

  ngOnInit(): void {
    this.typeGroup = this._formBuilder.group({
      devtype: ['', Validators.required],
    });
    this.descriptionGroup = this._formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      profilegroup: ['', Validators.required],
    });
    this.gatewayGroup = this._formBuilder.group({
      gatewayid: ['', Validators.required],
      // networkserver: ['', Validators.required],
      gatlang: ['', Validators.required],
      gatlong: ['', Validators.required],
    });
    this.sensorGroup=this._formBuilder.group({
      eui: ['', Validators.required],
      applicationkey: ['', Validators.required],
      deviceProfile: ['', Validators.required],
    })

    this.http.post("/api/user/admin/groups",{
    }).subscribe((val:any)=>{
      console.log(val);
      if(val.status==200){
        val.data.data.forEach((curr:any)=>{
          this.profilelist.push({
            deviceID:curr.id.id,
            name:curr.title
          } as deviceOptionList)
        })
      }
    })

    // this.http.post("api/device/sensor/info/profiles",{}).subscribe((val:any)=>{
    //   this.deviceprofilelist = val.data as Array<{id: string, name: string}>;
    // })
  }

  create(){
    if(this.deviceType=="sensor"){
      const obj = {
        customerID:this.descriptionGroup.get("profilegroup")?.value,
        hardwareName:this.sensorGroup.get("eui")?.value,
        labelName:this.descriptionGroup.get("name")?.value,
      } as AddSensorDevice
      this.http.post("api/device/add/sensor",{
        customerID:this.descriptionGroup.get("profilegroup")?.value,
        hardwareName:this.sensorGroup.get("eui")?.value,
        labelName:this.descriptionGroup.get("name")?.value,
        deviceProfileId:this.sensorGroup.get("deviceProfile")?.value,
      }).subscribe(val=>{
        console.log(val);
      })
    }
    else if(this.deviceType=="gateway"){
      const obj = {
        customerID:this.descriptionGroup.get("profilegroup")?.value,
        hardwareName:this.gatewayGroup.get("gatewayid")?.value,
        labelName:this.descriptionGroup.get("name")?.value,
      } as AddGatewayDevice
      this.http.post("api/device/add/gateway",{
        customerID:this.descriptionGroup.get("profilegroup")?.value,
        hardwareName:this.gatewayGroup.get("gatewayid")?.value,
        labelName:this.descriptionGroup.get("name")?.value,
      }).subscribe((val:any)=>{
        console.log(val)
        if(val.status==200){
          console.log("test");
          this.http.post("api/device/gateway/info/location/add",{
            deviceID:val.data.data.id.id,
            locationParameters:{
              latitude: this.gatewayGroup.get("gatlang")?.value,
              longitude: this.gatewayGroup.get("gatlong")?.value,
            }
          }).subscribe(curr=>{
            console.log(curr);
          })
        }

      })
    }



  }
}
