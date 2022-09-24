import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

interface DeviceInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'master-sensor-edit-view',
  templateUrl: './sensor-edit-view.component.html',
  styleUrls: ['./sensor-edit-view.component.scss'],
})
export class SensorEditViewComponent implements OnInit {

  sensorDetails = {
    name: "",
    id:"",
    eui:"",
    reserve:"",
    status: true
  };

  editSensor: UntypedFormGroup = new UntypedFormGroup({});

  reserveList:DeviceInterface[]=[];

  constructor(private formBuilder: UntypedFormBuilder, private router:Router, private http:HttpClient, private activeRoute:ActivatedRoute,private snackbar:MatSnackBar,private dialogcontroller:MatDialog) {
    this.activeRoute.paramMap.subscribe( params => { 
      this.sensorDetails.id = params.get('id') || "";
      this.sensorDetails.eui = params.get('devEUI') || "";
    })

    this.editSensor = this.formBuilder.group({
      name: ['',[Validators.required]],
    });

  }

  ngOnInit(): void {
    this.http.post("api/user/admin/groups",{}).subscribe((val:any)=>{
      this.reserveList = val.data.data.map((curr:any)=>{
        return {
          name:curr.name,
          id:curr.id.id
        }
      });
    })
  }

  saveSensor():void{
    console.log("save");
  }

  cancelEdit():void{
    this.router.navigate(['manage',{outlets:{managecontent:['manage-devices']}}]);  
  }

  unassign(id:string):void{
    this.http.post("api/device/admin/unassign",{
      deviceID:id
    }).subscribe((val:any)=>{
      console.log(val);
      if(val.status&&val.explanation=="call finished"){
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"Device Unassigned", icon:"check_circle"}});
        this.ngOnInit();
      }
    });

  }
  
  assign(id:string,reserveid:string):void{
    this.http.post("api/device/admin/assign",{
      deviceID:id,
      customerID:reserveid
    }).subscribe((val:any)=>{
      if(val.status&&val.explanation=="call finished"){
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"Device Assigned", icon:"check_circle"}});
        this.ngOnInit();
      }
    }); 
  }

}
