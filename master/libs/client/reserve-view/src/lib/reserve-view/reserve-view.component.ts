import { Component, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from '@master/client/map-apicaller';
import { DeviceNotifierService } from '@master/client/shared-services';
import { TokenManagerService } from '@master/client/user-storage-controller';
import { Device, Gateway, MapApiReserveResponse, ViewMapType } from '@master/shared-interfaces';
import { HttpClient } from "@angular/common/http"
import { CookieService } from 'ngx-cookie-service';

// export interface GatewayInput {
//   name: string;
//   id: string;
//   eui: string;
// }


export interface ReserveInfo {
  name: string;
  id: string;
}

@Component({
  selector: 'master-reserve-view',
  templateUrl: './reserve-view.component.html',
  styleUrls: ['./reserve-view.component.scss'],
})
export class ReserveViewComponent {
  @ViewChild('reservemap') reservemap: ReserveMapComponent | null = null;
  ViewMapTypeInput: ViewMapType;
  Reserve: MapApiReserveResponse | null = null;
  LastestHistorical: Device[];
  ShowPolygon: boolean;
  Gateways: Gateway[];
  ReserveName = "";
  token = "";

  reservesList: ReserveInfo[];
  selectedReserveId = "";

  constructor(public apicaller: MapCallerService, private tokenmanager: TokenManagerService, private notifier: DeviceNotifierService, private http: HttpClient,private cookiemanager:CookieService) {
    this.LastestHistorical = [];
    this.Gateways = [];
    this.ShowPolygon = true;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.token = this.tokenmanager.getToken();
    this.notifier.getSensorDeleted().subscribe(val => {
      this.LastestHistorical = this.LastestHistorical.filter(curr => curr.deviceID != val);
    })
    this.reservesList = [];
  }

  ngOnInit(): void {
    //TODO get reserves a user belongs to
    this.http.post("api/user/info", {}).subscribe((val: any) => {
      console.log('val :>> ', val);
      if(val.data?.additionalInfo?.reserves!=undefined&&val.data?.additionalInfo?.reserves.length>0){
        this.reservesList=val.data?.additionalInfo?.reserves.map((curr:any)=>{
          return {
            id:curr.reserveID,
            name:curr.reserveName
          }
        })
        this.selectedReserveId = val.data?.customerId.id;
      }
      // this.reservesList = [
      //   {
      //     id: "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      //     name: "reserve user group",
      //   },
      //   {
      //     id: "4bcece40-e1d9-11ec-a9b6-bbb9bad3df39",
      //     name: "reserve c",
      //   },
      //   {
      //     id: "123",
      //     name: "UP",
      //   }
      // ]
    })
    this.loadreserve(this.selectedReserveId);

  }

  updateViewMapType(newval: string) {
    if (newval == "norm") this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    else if (newval == "sat") this.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
  }

  updateRange(event: { start: number, end: number }): void {
    this.apicaller.getHistoricalWithTime(this.token, "123", [], event.start, event.end).then(val => {
      // console.table(val['data'])
      this.reservemap?.reload(val.data);
      this.LastestHistorical = val.data;
    });
  }

  updateReserve(newReserveId: string) {
    this.selectedReserveId = newReserveId;
    console.log("changed reserve");
    this.reservemap?.changeReserve();
    this.http.post("/api/user/reserve/change",{
      "reserveID":newReserveId
    }).subscribe((val:any)=>{
      if(val.explain=="ok"){
        if(val.data.token!=undefined&&val.data.refreshToken!=undefined){
          console.log("OLD TOKEN ",this.cookiemanager.get(""));
          this.token=val.data.token;
          this.cookiemanager.deleteAll();
          this.cookiemanager.set("PURELORA_TOKEN",val.data.token);
          this.cookiemanager.set("PURELORA_REFRESHTOKEN",val.data.refreshToken);
          this.loadreserve(newReserveId)
          console.log(val);
        }
      }

    });
  }

  loadreserve(newReserveId: string){
    this.selectedReserveId = newReserveId;
    this.apicaller.getReserve(this.token, this.selectedReserveId).then(val => {
      this.reservemap?.changeReserve();
      this.Reserve = val;
      console.log(this.Reserve);
      if (this.Reserve?.data?.reserveName != undefined)
      this.ReserveName = this.Reserve?.data?.reserveName;
    });
    this.apicaller.getHistorical(this.token, this.selectedReserveId, []).then(val => {
      this.LastestHistorical = val.data;
      this.reservemap?.loadInnitial(this.LastestHistorical);

    });
    this.apicaller.getGateways(this.selectedReserveId).then((val: any) => {
      console.log(val)
      this.Gateways = val.map((curr: any) => ({ id: curr.deviceID, name: curr.humanName, eui: curr.deviceName,location:curr.location } as Gateway));
      console.log(this.Gateways)
      this.reservemap?.loadGateways(this.Gateways);
    })
  }
}
