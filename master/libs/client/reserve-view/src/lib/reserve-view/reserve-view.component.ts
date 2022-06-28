import { Component, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from '@master/client/map-apicaller';
import { DeviceNotifierService } from '@master/client/shared-services';
import { TokenManagerService } from '@master/client/user-storage-controller';
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
  ReserveName="";
  token="";

  constructor(private apicaller:MapCallerService,private tokenmanager:TokenManagerService,private notifier:DeviceNotifierService) {
    this.LastestHistorical=[];
    this.Gateways=[];
    this.ShowPolygon=true;
    this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.token=this.tokenmanager.getToken();
    this.notifier.getSensorDeleted().subscribe(val=>{
      this.LastestHistorical=this.LastestHistorical.filter(curr=>curr.deviceID!=val);
    })
  }
  
  ngOnInit(): void {
    //get the reserve
    //TODO check for incorrect token response
    this.apicaller.getReserve(this.token, "123").then(val =>{
      this.Reserve = val;
      if(this.Reserve?.data?.reserveName!=undefined)
        this.ReserveName=this.Reserve?.data?.reserveName;
      });
    this.apicaller.getHistorical(this.token,"123",[]).then(val=>{
      // console.log(val+"thingdd")
      console.log(val);
      this.LastestHistorical=val.data;
      this.reservemap?.loadInnitial(this.LastestHistorical);
    });
    this.apicaller.getGateways(this.token,"ef55ff40-dfe8-11ec-bdb3-750ce7ed2451").then((val:any)=>{
      console.log(val)
      this.Gateways=val.data.map((curr:any)=>({id:curr.deviceID,name:curr.humanName,eui:curr.deviceName} as GatewayInput));
      console.log(this.Gateways)
    })
  }

  // updateSensor(idinput:string){
  //   if(idinput==""){
  //     this.reservemap?.resetData();
  //   }
  //   else{
  //     if(!this.reservemap?.showOnly(idinput)){
  //       alert("No location data found");
  //     }
  //   }
  // }

  updateViewMapType(newval:string){
    if(newval=="norm") this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
    else if(newval=="sat") this.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
  }

  updateRange(event:{start:number,end:number}):void{
    this.apicaller.getHistoricalWithTime(this.token,"123",[],event.start,event.end).then(val=>{
      this.reservemap?.reload(this.LastestHistorical);
    });
  }
}
