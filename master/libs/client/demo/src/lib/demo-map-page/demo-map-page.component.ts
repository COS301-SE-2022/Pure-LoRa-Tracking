/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from "@master/client/map-apicaller"
import { MapApiHistoricalResponse, MapApiLatestResponse, MapApiReserveResponse, MapRender, ViewMapType } from "@master/shared-interfaces"
import { Device } from 'libs/api/map-endpoint/src/lib/map-api.interface';
@Component({
  selector: 'master-demo-map-page',
  templateUrl: './demo-map-page.component.html',
  styleUrls: ['./demo-map-page.component.scss'],
})
export class DemoMapPageComponent implements OnInit {
  @ViewChild('reservemap') reservemap:ReserveMapComponent|null=null;

  Reserve: MapApiReserveResponse | null = null
  Latest: MapApiLatestResponse | null = null;
  Historical:MapApiHistoricalResponse|null=null;
  HistoricalView:Array<string>=[];
  MapRenderInput: MapRender;
  ViewMapTypeInput: ViewMapType;
  ShowMarkers:boolean;
  ShowPolygon:boolean;
  HistoricalLoading:boolean;
  LastestHistorical:Device[];
  constructor(private caller: MapCallerService) {
    //set default map options
    this.MapRenderInput = MapRender.ALL;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.ShowMarkers=true;
    this.ShowPolygon=true;
    this.HistoricalLoading=false;
    this.LastestHistorical=[];

    //call the api
    caller.getReserve("sf", "sdf").then(val => this.Reserve = val);
    caller.getHistorical("ss","ss",["sens-11","sens-12","sens-13"]).then(val=>{
      this.LastestHistorical=val.data
      this.reservemap?.loadInnitial(this.LastestHistorical);
    });
  }

  updateMapView(type: any):void {
    if (type == "normal") {
      this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    }
    else if (type == "esri") {
      this.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
      if(this.Latest!=null)this.Latest.code=100;
    }
  }

  updateMarkerView(checked:boolean):void{
    this.ShowMarkers=checked;
  }

  updatePolygonView(checked:boolean):void{
    this.ShowPolygon=checked;
  }

  viewhistorical(deviceID:string):void{
    //we use historical loading to prevent another call
    //while we are waiting for the then
    this.HistoricalLoading=true;
    this.reservemap?.showOnly(deviceID);
  }

  hidehistorical(deviceID:string):void{
    this.HistoricalView=this.HistoricalView.filter(val=>val!=deviceID);
    this.reservemap?.hidehistorical(deviceID);
  }

  ngOnInit(): void {
      console.log("component loaded");
   }

  ShowOnlyDevice(deviceID:string):void{
      this.reservemap?.showOnly(deviceID);
  }
}
