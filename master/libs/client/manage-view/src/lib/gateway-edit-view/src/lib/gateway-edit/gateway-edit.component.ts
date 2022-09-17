import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  gatewayInfo: FormGroup = new FormGroup({});

  constructor(private router: Router,private activeRoute:ActivatedRoute,private http:HttpClient,private formBuilder: FormBuilder) {
    this.id="";
    this.activeRoute.paramMap.subscribe( params => { 
      this.id = params.get('id');
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
      deviceID:this.id,
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
