import { Component, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from '@master/client/map-apicaller';
import { Device, MapApiReserveResponse, ViewMapType } from '@master/shared-interfaces';

@Component({
  selector: 'master-reserve-view',
  templateUrl: './reserve-view.component.html',
  styleUrls: ['./reserve-view.component.scss'],
})
export class ReserveViewComponent {
  @ViewChild('reservemap') reservemap:ReserveMapComponent|null=null;
  ViewMapTypeInput: ViewMapType;
  Reserve:MapApiReserveResponse|null=null;
  LastestHistorical:Device[];
  ShowPolygon:boolean;



  constructor(private apicaller:MapCallerService) {
    this.LastestHistorical=[];
    this.ShowPolygon=true;
    this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
  }
  
  ngOnInit(): void {
    //get the reserve
    this.apicaller.getReserve("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImVjOTA0ODYwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiMDEzYTllMC1lNzYzLTExZWMtODkzMS02OTgxYmE1OGM4NGIiLCJjdXN0b21lcklkIjoiZGE2NzhhNDAtZTc2My0xMWVjLTg5MzEtNjk4MWJhNThjODRiIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3Njk3ODAsImV4cCI6MTY1NDc3ODc4MH0.t14lVjGoxYPvJJXU3D7gx4wC6AsFzygfNzV4RzlJfFeKNGE1GBVwVLzOkmWVr6xSUzR7UaYC0mmrQLxMw_7AHw",
     "sdf")
    .then(val => this.Reserve = val);
    this.apicaller.getHistorical("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImVjOTA0ODYwLWU3NjMtMTFlYy04OTMxLTY5ODFiYTU4Yzg0YiIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiMDEzYTllMC1lNzYzLTExZWMtODkzMS02OTgxYmE1OGM4NGIiLCJjdXN0b21lcklkIjoiZGE2NzhhNDAtZTc2My0xMWVjLTg5MzEtNjk4MWJhNThjODRiIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3Njk3ODAsImV4cCI6MTY1NDc3ODc4MH0.t14lVjGoxYPvJJXU3D7gx4wC6AsFzygfNzV4RzlJfFeKNGE1GBVwVLzOkmWVr6xSUzR7UaYC0mmrQLxMw_7AHw",
    "ss",[]).then(val=>{
      this.LastestHistorical=val.data;
      this.reservemap?.loadInnitial(this.LastestHistorical);
    });
  }

  updateSensor(idinput:string){
    if(idinput==""){
      this.reservemap?.resetData();
    }
    else{
      this.reservemap?.showOnly(idinput);
    }
  }

  updateViewMapType(newval:string){
    if(newval=="norm") this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
    else if(newval=="sat") this.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
  }
}
