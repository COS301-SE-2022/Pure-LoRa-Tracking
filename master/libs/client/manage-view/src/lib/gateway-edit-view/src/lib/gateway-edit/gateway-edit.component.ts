import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'master-gateway-edit',
  templateUrl: './gateway-edit.component.html',
  styleUrls: ['./gateway-edit.component.scss'],
})
export class GatewayEditComponent   {
  
gateway={
  name:'',
  id:''
}
  id:string|null;
  devEUI:string|null;
  gatewayInfo: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private router: Router,private activeRoute:ActivatedRoute,private http:HttpClient,private formBuilder: UntypedFormBuilder) {
    this.id="";
    this.devEUI=null;
    this.activeRoute.paramMap.subscribe( params => { 
      this.id = params.get('id');
      this.devEUI = params.get('devEUI');
      console.log("id",this.id);
    });
    this.gatewayInfo = this.formBuilder.group({
      lat: [null,[Validators.required]],
      lng: [null,[Validators.required]],
    });
    
  }

  cancelEdit():void{
    this.router.navigate(['manage',{outlets:{managecontent:['manage-devices']}}]);  
  }

  savegateway():void{
    console.log("save");
    this.http.post("/api/device/admin/gateway/info/location/add",{
      deviceID: this.id,
      devEUI: this.devEUI,
      locationParameters: {
        latitude: this.gatewayInfo.get("lat")?.value,
        longitude: this.gatewayInfo.get("lng")?.value,
      }
    }).subscribe((val:any)=>{
      //TODO add snackbar alert
      console.log(val);
    })
  }
}
