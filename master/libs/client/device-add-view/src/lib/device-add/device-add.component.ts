import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddGatewayDevice, AddSensorDevice, ActivationKeys } from '@master/shared-interfaces';
import {TokenManagerService} from "@master/client/user-storage-controller"
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {deviceOptionList} from "@master/shared-interfaces"
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';
@Component({
  selector: 'master-add-device',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.scss'],
})

export class DeviceAddComponent implements OnInit {
  
  typeGroup!: UntypedFormGroup;
  descriptionGroup!: UntypedFormGroup;
  infoGroup!: UntypedFormGroup;
  gatewayGroup!:UntypedFormGroup;
  sensorGroup!:UntypedFormGroup;
  profilelist:Array<deviceOptionList>=[];
  deviceprofilelist: Array<{ id: string, name: string, isOTAA: boolean, macVerion: string }>=[];
  deviceType = "";
  isABP = false;
  lora1_0 = false;
  lora1_1 = false;

  constructor(private _formBuilder: UntypedFormBuilder,private http:HttpClient,private tokenmanager:TokenManagerService,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.typeGroup = this._formBuilder.group({
      devtype: ['', Validators.required],
    });
    this.descriptionGroup = this._formBuilder.group({
      name: ['', Validators.required],
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
      deviceProfile: ['', Validators.required],

      devAddr: ['', Validators.required],
      nwkSkey: ['', Validators.required],
      appSkey: ['', Validators.required],

      appKey: ['', Validators.required],
      nwkKey: ['', Validators.required],     
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

    this.http.post("api/device/admin/sensor/info/profiles",{}).subscribe((val:any)=>{
      this.deviceprofilelist = val.data as Array<{ id: string, name: string, isOTAA: boolean,macVerion: string }>;
      console.log(this.deviceprofilelist);
    })
  }

  create(){
    if(this.deviceType=="sensor"){
      const keyAct = {
        isABP: this.isABP,
        lora1_1: this.lora1_1,
        devAddr: this.sensorGroup.get("devAddr")?.value,
        appSKey: this.sensorGroup.get("appSKey")?.value,
        nwkSEncKey: this.sensorGroup.get("nwkSkey")?.value,
        
        // fNwkSIntKey: this.sensorGroup.get("fNwkSIntKey")?.value,
        // sNwkSIntKey: this.sensorGroup.get("sNwkSIntKey")?.value,
        
        appKey: this.sensorGroup.get("appKey")?.value,
        nwkKey: this.sensorGroup.get("nwkKey")?.value,
      } as ActivationKeys

      const obj = {
        customerID: this.descriptionGroup.get("profilegroup")?.value,
        hardwareName: this.sensorGroup.get("eui")?.value,
        labelName: this.descriptionGroup.get("name")?.value,
      } as AddSensorDevice
      this.http.post("api/device/admin/add/sensor",{
        customerID: this.descriptionGroup.get("profilegroup")?.value,
        hardwareName: this.sensorGroup.get("eui")?.value,
        labelName: this.descriptionGroup.get("name")?.value,
        deviceProfileId: this.sensorGroup.get("deviceProfile")?.value,
        activationKeys: keyAct
      }).subscribe(val=>{
        console.log(val);
      })
    }
    else if(this.deviceType=="gateway"){
      const obj = {
        customerID: this.descriptionGroup.get("profilegroup")?.value,
        hardwareName: this.gatewayGroup.get("gatewayid")?.value,
        labelName: this.descriptionGroup.get("name")?.value,
      } as AddGatewayDevice
      this.http.post("api/device/admin/add/gateway",{
        customerID: this.descriptionGroup.get("profilegroup")?.value,
        hardwareName: this.gatewayGroup.get("gatewayid")?.value,
        labelName: this.descriptionGroup.get("name")?.value,
      }).subscribe((val:any)=>{
        console.log(val)
        if(val.status==200){
          console.log("test");
          this.http.post("api/device/admin/gateway/info/location/add",{
            deviceID: val.data.deviceCreate.data.id.id,
            devEUI: val.data.deviceCreate.data.name,
            locationParameters:{
              latitude: this.gatewayGroup.get("gatlang")?.value,
              longitude: this.gatewayGroup.get("gatlong")?.value,
            }
          }).subscribe((curr:any)=>{
            console.log(curr);
            if(curr.explanation=="call finished"){
              this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"Device Added", icon:"check_circle"}});
            }
          })
        }

      })
    }

  }
  
  changeProfile(selected: any) {
    
    const obj = this.deviceprofilelist.find(x => x.id == selected.value)
    this.isABP = false;
    this.lora1_0 = false;
    this.lora1_1 = false;
    
    if (obj?.isOTAA) {
      this.isABP = false;

      // this.lora1_0 = (obj?.macVerion.startsWith("1.0")
      if (obj?.macVerion.startsWith("1.0")) 
        this.lora1_0 = true;
      else 
        this.lora1_0 = false;

      if (obj?.macVerion.startsWith("1.1")) 
        this.lora1_1 = true;
      else 
        this.lora1_1 = false;
    }
    else this.isABP = true;
  }

}
