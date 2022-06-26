import { Component, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from '@master/client/map-apicaller';
import { Device, MapApiReserveResponse, ViewMapType } from '@master/shared-interfaces';
export interface GatewayInput {
  name: string;
  id: string;
  eui:string;
}

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
  Gateways:GatewayInput[];
  token="eyJhbGciOiJIUzUxMiJ9.eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImY5NmU2MGQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiZWY1NWZmNDAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTYyNTI1ODEsImV4cCI6MTY1NjI2MTU4MX0.8syU3F23EmrwNsOJoC7SqxH5glBZ1vG4YEaLi2DIcDL7HOl5G_cAIAONVEbW7brZ8DI9jQJsYJq44-0LVAD9nQ.xoZzxHTsM2ej27xRln1Q1Ly8-F_nY97-uPejn1QmWmyQ_ubKquJiGqciuo-jwOtzszVyCCHnfCjVp5AKNsVqdw";

  constructor(private apicaller:MapCallerService) {
    this.LastestHistorical=[];
    this.Gateways=[];
    this.ShowPolygon=true;
    this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
  }
  
  ngOnInit(): void {
    //get the reserve
    this.apicaller.getReserve(this.token, "123").then(val => this.Reserve = val);
    this.apicaller.getHistorical(this.token,"123",[]).then(val=>{
      console.log(val)
      this.LastestHistorical=val.data;
      this.reservemap?.loadInnitial(this.LastestHistorical);
    });
    this.apicaller.getGateways(this.token,"ef55ff40-dfe8-11ec-bdb3-750ce7ed2451").then((val:any)=>{
      this.Gateways=val.data.map((curr:any)=>({id:curr.deviceID,name:curr.humanName,eui:curr.deviceName} as GatewayInput));
      console.log(this.Gateways)
    })
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
