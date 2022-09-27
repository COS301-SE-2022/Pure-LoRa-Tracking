import { Component, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from '@master/client/map-apicaller';
import { DeviceNotifierService } from '@master/client/shared-services';
import { TokenManagerService } from '@master/client/user-storage-controller';
import { Device, Gateway, MapApiReserveResponse, StartEndTimestamps, ViewMapType } from '@master/shared-interfaces';
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
  isadmin = false;
  processingType="TRI";
  reservesList: ReserveInfo[];
  selectedReserveId = "";
  noReservesMessage = "You do not belong to any reserves.\nPlease contact your reserve administrator.";
  constructor(public apicaller: MapCallerService, private tokenmanager: TokenManagerService, private notifier: DeviceNotifierService, private http: HttpClient, private cookiemanager: CookieService) {
    this.LastestHistorical = [];
    this.Gateways = [];
    this.ShowPolygon = true;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.token = this.tokenmanager.getToken();
    this.notifier.getSensorDeleted().subscribe(val => {
      this.LastestHistorical = this.LastestHistorical.filter(curr => curr.deviceID != val);
    })
    this.reservesList = [];
    this.notifier.getTimeStamps().subscribe((val: StartEndTimestamps) => {
      this.apicaller.getHistoricalWithTime(this.token, this.selectedReserveId, [], val.startTime, val.endTime,this.processingType).then(val => {
        // console.table(val['data'])
        this.reservemap?.reload(val.data);
        this.LastestHistorical = val.data;
      });
    })
  }

  ngOnInit(): void {
    //TODO get reserves a user belongs to

    this.http.post("api/user/info", {}).subscribe((val: any) => {
      console.log('val :>> ', val)
      if (val.data.authority == "TENANT_ADMIN") {
        this.isadmin = true;
        this.apicaller.getReserve().then(otherval => {
          //create new object
          const temp = {
            code: otherval.code,
            explanation: otherval.explanation,
            status: otherval.status,
            data: {
              reserveName: otherval.adminData[0].reserveName,
              location: otherval.adminData[0].location
            }
          } as MapApiReserveResponse
          this.selectedReserveId = otherval.adminData[0].reserveID;
          // console.log(otherval);
          this.reservesList = otherval.adminData.map((curr: any) => {
            return {
              id: curr.reserveID,
              name: curr.reserveName
            }
          })
          this.Reserve = temp;
          console.log("reserve call in nginit", this.Reserve);
          if (this.Reserve?.data?.reserveName != undefined) {
            this.ReserveName = this.Reserve?.data?.reserveName;
          }
          this.loadreserve(this.selectedReserveId);
        });
      } else {
        if (val.data?.additionalInfo?.reserves != undefined && val.data?.additionalInfo?.reserves.length > 0) {
          this.reservesList = val.data?.additionalInfo?.reserves.map((curr: any) => {
            return {
              id: curr.reserveID,
              name: curr.reserveName
            }
          })
          this.selectedReserveId = val.data?.customerId.id;
          this.loadreserve(this.selectedReserveId);
        }
      }

    })


  }

  updateViewMapType(newval: string) {
    if (newval == "norm") this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    else if (newval == "sat") this.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
  }

  updateReserve(newReserveId: string) {
    this.selectedReserveId = newReserveId;
    console.log("changed reserve");
    this.reservemap?.changeReserve();

    if (this.isadmin) {
      this.loadreserve(newReserveId)
    } else {
      this.http.post("/api/user/reserve/change", {
        "reserveID": newReserveId
      }).subscribe((val: any) => {
        if (val.explain == "ok") {
          if (val.data.token != undefined && val.data.refreshToken != undefined) {
            console.log("OLD TOKEN ", this.cookiemanager.get(""));
            this.token = val.data.token;
            this.cookiemanager.deleteAll();
            this.cookiemanager.set("PURELORA_TOKEN", val.data.token);
            this.cookiemanager.set("PURELORA_REFRESHTOKEN", val.data.refreshToken);
            this.loadreserve(newReserveId)
            console.log(val);
          }
        }
      });
    }
  }

  typeChange(event:string){
    this.processingType=event;
    this.apicaller.getHistoricalWithTime(this.token, this.selectedReserveId, [], this.notifier.getTimeStampsValue().startTime, this.notifier.getTimeStampsValue().endTime,this.processingType).then(val => {
      // console.table(val['data'])
      this.reservemap?.reload(val.data);
      this.LastestHistorical = val.data;
    });
  }


  loadreserve(newReserveId: string) {
    this.selectedReserveId = newReserveId;
    this.apicaller.getReserve().then(val => {
      console.log(val);
      // this.reservemap?.changeReserve();
      if (val.isAdmin) {
        const temp = {
          code: val.code,
          explanation: val.explanation,
          status: val.status,
          data: {
            reserveName: val.adminData?.find((curr: any) => curr.reserveID == newReserveId).reserveName,
            location: val.adminData?.find((curr: any) => curr.reserveID == newReserveId).location
          }
        } as MapApiReserveResponse
        val = temp;
      }
      this.Reserve = val;
      console.log("reserve call in loadreserve", this.Reserve);
      if (this.Reserve?.data?.reserveName != undefined)
        this.ReserveName = this.Reserve?.data?.reserveName;
    });
    //if there is no current set timestamp
    if (!this.notifier.isTimeSet()) {
      this.apicaller.getHistorical(this.token, this.selectedReserveId, []).then(val => {
        this.LastestHistorical = val.data;
        this.reservemap?.loadInnitial(this.LastestHistorical);
      });
    }
    else{
      this.apicaller.getHistoricalWithTime(this.token, this.selectedReserveId, [], this.notifier.getTimeStampsValue().startTime, this.notifier.getTimeStampsValue().endTime,this.processingType).then(val => {
        // console.table(val['data'])
        this.LastestHistorical = val.data;
        this.reservemap?.loadInnitial(this.LastestHistorical);
      });
    }
    this.apicaller.getGateways(this.selectedReserveId).then((val: any) => {
      console.log(val)
      this.Gateways = val.map((curr: any) => ({ id: curr.deviceID, name: curr.humanName, eui: curr.deviceName, location: curr.location } as Gateway));
      console.log(this.Gateways)
      this.reservemap?.loadGateways(this.Gateways);
    })
  }
}
