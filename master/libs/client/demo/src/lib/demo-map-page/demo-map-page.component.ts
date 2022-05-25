/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MapCallerService } from "@master/client/map-apicaller"
import { MapApiLatestResponse, MapApiReserveResponse, MapRender, ViewMapType } from "@master/shared-interfaces"
@Component({
  selector: 'master-demo-map-page',
  templateUrl: './demo-map-page.component.html',
  styleUrls: ['./demo-map-page.component.scss'],
})
export class DemoMapPageComponent implements OnInit {
  Reserve: MapApiReserveResponse | null = null
  Latest: MapApiLatestResponse | null = null;
  MapRenderInput: MapRender;
  ViewMapTypeInput: ViewMapType;
  ShowMarkers:boolean;
  ShowPolygon:boolean;
  constructor(private caller: MapCallerService) {
    //set default map options
    this.MapRenderInput = MapRender.ALL;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.ShowMarkers=true;
    this.ShowPolygon=true;
    //call the api
    caller.getReserve("sf", "sdf").then(val => this.Reserve = val);
    caller.getLatest("sf", "sdf").then(val => this.Latest = val);
  }

  updateMapView(type: any) {
    if (type == "normal") {
      this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    }
    else if (type == "esri") {
      this.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
      if(this.Latest!=null)this.Latest.code=100;
    }
  }

  updateMarkerView(checked:boolean){
    this.ShowMarkers=checked;
  }

  updatePolygonView(checked:boolean){
    this.ShowPolygon=checked;
  }


  ngOnInit(): void { }
}
