import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogConfirmationComponent, SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';

export interface DeviceInterface {
  id: string;
  name: string;
}
export interface SensorGatewayInterface{
  id: string,
  name: string,
  reserve: string,
  status: boolean
}
@Component({
  selector: 'master-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
})

export class DevicesListComponent implements OnInit {

  sensorColumns:string[] = ["id", "name","reserve","status","delete","edit"];

  gatewayColumns:string[] = ["id", "name","reserve","status","delete","edit"];

  gatewayData:SensorGatewayInterface[] = [];

  sensorData:SensorGatewayInterface[] = [];

  reserveList:DeviceInterface[]=[];

  constructor(private http:HttpClient, private router:Router,private snackbar:MatSnackBar,private dialogcontroller:MatDialog) {}

  ngOnInit(): void {
    this.sensorData=[];
    this.gatewayData=[];
    this.http.post("api/user/admin/groups",{}).subscribe((val:any)=>{
      // console.log(val);
      this.reserveList = val.data.data.map((curr:any)=>{
        return {
          name:curr.name,
          id:curr.id.id
        }
      });
      this.reserveList.forEach((curr)=>{
        this.http.post("api/map/historical",{
          reserveID:curr.id
        }).subscribe((val:any)=>{
          // console.log(val);
          if(val.data.length>0){
          this.sensorData = this.sensorData.concat(val.data.map((other:any)=>{
            return {
              id:other.deviceID,
              name:other.deviceName,
              reserve:curr.id,
              status:true
            }
          }));
          }
        });

        this.http.post("/api/device/gateway/info",{
          customerID:curr.id
        }).subscribe((val:any)=>{
          // console.log('val :>> ', val);
          this.gatewayData=this.gatewayData.concat(val.data.map((other:any)=>{
            return {
              id:other.deviceID,
              name:other.deviceName,
              reserve:curr.id,
              status:true
            }
          }));
        })
      })
    })
    this.http.post("api/device/admin/available",{}).subscribe((val:any)=>{
      console.log("curr",val);
      if(val.data!=undefined){
      this.sensorData=this.sensorData.concat(val.data.filter((curr:any)=>!curr.isGateway).map((curr:any)=>{
        return {
          id:curr.deviceID,
          name:curr.deviceName,
          reserve:"",
          status:false
        }
      }));
      this.gatewayData=this.gatewayData.concat(val.data.filter((curr:any)=>curr.isGateway).map((curr:any)=>{
        return {
          id:curr.deviceID,
          name:curr.deviceName,
          reserve:"",
          status:false
        }
      }));

    }
    });

  }

  deleteDevice(id:string,isGateway:boolean,eui:string):void {
    console.log("Delete: " + id);
    const mydialog=this.dialogcontroller.open(DialogConfirmationComponent,{
      data: {
        title: 'Confirm Delete',
        dialogMessage: 'Are you sure you want to this device?  NOTE: THIS ACTION CANNOT BE REVERSED!',
      },
    })
    mydialog.afterClosed().subscribe(val=>{
      if(val){
        this.http.post("/api/device/admin/delete",{
          deviceID: id,
          isGateway: isGateway,
          devEUI: eui
        }).subscribe((other:any)=>{
          console.log(other);
          if(other.status=="200"&&other.explanation=="ok"){
            this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['red-snackbar'], data: {message:"Device Deleted", icon:"check_circle"}});
            this.ngOnInit();
          }
        })
      }
    })
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

  reassign(id:string,reserveid:string,other:string):void{
    console.log("first "+reserveid+" "+reserveid+" "+other);
  }

  editGateway(id:string,devEUI:string): void {
    this.router.navigate(['manage',{outlets:{managecontent:['edit-gateway',id,devEUI]}}]);  
  }

  addDeviceNavigate(): void {
    this.router.navigate(['manage',{outlets:{managecontent:['add-device']}}]);  
  }

  editSensor(id:string,devEUI:string): void {
    this.router.navigate(['manage',{outlets:{managecontent:['edit-sensor',id,devEUI]}}]);  
  }

}


