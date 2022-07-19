import { Component, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from '@master/client/map-apicaller';
import { DeviceNotifierService } from '@master/client/shared-services';
import { TokenManagerService } from '@master/client/user-storage-controller';
import { Device, MapApiReserveResponse, ViewMapType } from '@master/shared-interfaces';
import {HttpClient} from "@angular/common/http"

export interface GatewayInput {
  name: string;
  id: string;
  eui:string;
}


export interface ReserveInfo {
  name:string;
  id:string;
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

  reservesList:ReserveInfo[];
  selectedReserveId="";

  constructor(public apicaller:MapCallerService,private tokenmanager:TokenManagerService,private notifier:DeviceNotifierService,private http:HttpClient) {
    this.LastestHistorical=[];
    this.Gateways=[];
    this.ShowPolygon=true;
    this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.token=this.tokenmanager.getToken();
    this.notifier.getSensorDeleted().subscribe(val=>{
      this.LastestHistorical=this.LastestHistorical.filter(curr=>curr.deviceID!=val);
    })
    this.reservesList = [];
  }
  
  ngOnInit(): void {
    //TODO get reserves a user belongs to
    this.http.post("api/user/info",{
      "token":"f96e60d0-dfe8-11ec-bdb3-750ce7ed2451"
    }).subscribe((val:any)=>{
      this.reservesList = [
        {
          id:"ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
          name:"reserve user group",
        },
        {
          id:"4bcece40-e1d9-11ec-a9b6-bbb9bad3df39",
          name:"reserve c",
        },
        {
          id:"123",
          name:"UP",
        }
      ]
      this.selectedReserveId = this.reservesList[0].id;
    })
    this.updateReserve(this.selectedReserveId);
    
  }

  updateViewMapType(newval:string){
    if(newval=="norm") this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
    else if(newval=="sat") this.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
  }

  updateRange(event:{start:number,end:number}):void{
    this.apicaller.getHistoricalWithTime(this.token,"123",[],event.start,event.end).then(val=>{
      // console.table(val['data'])
      this.reservemap?.reload(val['data']);
    });
  }

  updateReserve(newReserveId:string){
    this.selectedReserveId = newReserveId;
    console.log("changed reserve");
    this.apicaller.getReserve(this.token,this.selectedReserveId).then(val =>{
      this.Reserve = val;
      console.log(this.Reserve);
      if(this.Reserve?.data?.reserveName!=undefined)
        this.ReserveName=this.Reserve?.data?.reserveName;
      });
    this.apicaller.getHistorical(this.token,this.selectedReserveId,[]).then(val=>{
      this.LastestHistorical=val.data;
      this.reservemap?.loadInnitial(this.LastestHistorical);
    });
    this.apicaller.getGateways(this.token,"ef55ff40-dfe8-11ec-bdb3-750ce7ed2451").then((val:any)=>{
      console.log(val)
      this.Gateways=val.data.map((curr:any)=>({id:curr.deviceID,name:curr.humanName,eui:curr.deviceName} as GatewayInput));
      console.log(this.Gateways)
    })
  }
}
