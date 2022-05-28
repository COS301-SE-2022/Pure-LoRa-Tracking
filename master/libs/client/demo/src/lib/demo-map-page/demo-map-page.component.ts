/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from "@master/client/map-apicaller"
import { MapApiHistoricalResponse, MapApiLatestResponse, MapApiReserveResponse, MapRender, ViewMapType } from "@master/shared-interfaces"
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

  constructor(private caller: MapCallerService) {
    //set default map options
    this.MapRenderInput = MapRender.ALL;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.ShowMarkers=true;
    this.ShowPolygon=true;
    this.HistoricalLoading=false;
    //call the api
    caller.getReserve("sf", "sdf").then(val => this.Reserve = val);
    caller.getLatest("sf", "sdf").then(val => this.Latest = val);
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
    this.caller.getHistorical("sd","sd",deviceID).then(val=>{
      this.Historical=val
      this.reservemap?.displayhistorical(val);
      this.HistoricalView.push(deviceID);
      this.HistoricalLoading=false;
    });
  }

  hidehistorical(deviceID:string):void{
    this.HistoricalView=this.HistoricalView.filter(val=>val!=deviceID);
    this.reservemap?.hidehistorical(deviceID);
  }

  ngOnInit(): void {
    

   }
}
