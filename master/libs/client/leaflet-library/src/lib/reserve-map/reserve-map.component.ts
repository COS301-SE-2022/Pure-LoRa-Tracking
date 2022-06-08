import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { Device,MapApiHistoricalData, MapApiHistoricalResponse, MapApiLatestResponse, MapApiReserveResponse, MapHistoricalPoints, MapRender, MarkerView, ViewMapType, } from '@master/shared-interfaces';
import * as L from 'leaflet';
// This library does not declare a module type, we we need to ignore this
// error for a successful import
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { antPath } from "leaflet-ant-path"

@Component({
  selector: 'master-reserve-map',
  templateUrl: './reserve-map.component.html',
  styleUrls: ['./reserve-map.component.scss'],
})
export class ReserveMapComponent implements OnInit, OnChanges {

  // @Input() Latest: MapApiLatestResponse | null = null;
  @Input() Reserve: MapApiReserveResponse | null = null;
  @Input() LatestData: Device[] = [];
  @Input() MapRenderInput: MapRender;
  @Input() ViewMapTypeInput: ViewMapType;
  @Input() MarkerViewInput: MarkerView;
  @Input() ShowMarkers: boolean;
  @Input() ShowPolygon: boolean;
  @Input() HistoricalMode: boolean;
  // @Input() HistoricalDataID:number;
  public mainmap: any = null;
  public maptiles: any = null;
  public currentHistoricalId: number;
  public currentantpath: any = null;
  // private mapmarkers: Array<L.Marker<any>> = [];
  public mappolygons: L.Polygon;
  public historicalpath: Array<MapHistoricalPoints> = [];
  private bluecirlceicon: L.Icon = new L.Icon({
    iconUrl: "assets/MapIcons/BaseCircle.png",
    iconSize: [20, 20]
  });


  constructor() {
    //set default map options
    this.MapRenderInput = MapRender.ALL;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.MarkerViewInput = MarkerView.DEFAULT_MARKER;
    this.ShowMarkers = true;
    this.ShowPolygon = true;
    this.HistoricalMode = false;
    // this.HistoricalDataID=-1;
    this.mappolygons=new L.Polygon([]);
    this.currentHistoricalId = -1;
  }

  ngOnInit(): void {
    console.log("Component loaded");
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    //assume that if reserve is changed, reload everything
    if (Object.prototype.hasOwnProperty.call(changes, "Reserve")) {
      this.loadmap();
      this.loadmaptiles();
      this.loadPolygons();
      this.showpolygon();
    }
    else {
      //using else if as these are single changes
      if (Object.prototype.hasOwnProperty.call(changes, "ViewMapTypeInput")) {
        this.loadmaptiles();
      }
      else if (Object.prototype.hasOwnProperty.call(changes, "ShowPolygon")) {
        if (this.ShowPolygon) {
          this.showpolygon();
        } else {
          this.hidepolygon();
        }
      }
      else if (Object.prototype.hasOwnProperty.call(changes, "HistoricalDataID")) {
        console.log("change historical");
      }
    }

  }

  //MAP

  public loadmap(): void {
    if (this.Reserve?.data != null) {
      if (this.mainmap != null) this.mainmap.remove();//if change to main map reload
      this.mainmap = L.map('map', {
        center: [
          parseFloat(this.Reserve?.data?.center.latitude),
          parseFloat(this.Reserve?.data?.center.longitude),
        ],
        zoom: 18,
      });
    }

  }

  //MAPTILES

  public loadmaptiles(): void {
    if (this.mainmap != null) {
      if (this.maptiles != null) {
        //if there are tiles, reset them
        this.maptiles.remove();
        this.maptiles = null;
      }
      if (this.ViewMapTypeInput == ViewMapType.NORMAL_OPEN_STREET_VIEW) {
        this.maptiles = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            minZoom: 2,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        );
      }
      else if (this.ViewMapTypeInput == ViewMapType.SATELLITE_ESRI_1) {
        this.maptiles = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 19,
            minZoom: 2,
            attribution:
              'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          }
        );
      }
      this.maptiles.addTo(this.mainmap);
    }
  }


  //POLYGONS

  public loadPolygons(): void {
    if (this.Reserve?.data != null) {
      //load the polygon points
      if (
        this.Reserve.data.location != null &&
        this.Reserve.data.location.length > 2
      ) {
        this.mappolygons = L.polygon(this.Reserve.data.location.map((val) => [
          parseFloat(val.latitude),
          parseFloat(val.longitude),
        ]) as unknown as L.LatLngExpression[])
      }
    }
  }

  public showpolygon(): void {
    if (!this.mappolygons.isEmpty()&&this.mainmap!=null) {
      this.mappolygons.addTo(this.mainmap);
    }
  }

  public hidepolygon(): void {
    if (!this.mappolygons.isEmpty()) {
      this.mappolygons.remove();
    }
  }



  public hideHistoricalExceptMarker(deviceID:string): void {
    this.historicalpath.forEach(val=>{
      if(val.deviceID!=deviceID) val.markers.forEach(val => val.remove())
      val.polyline.remove();
    })
  }

  //load the antpath for one of the devices
  public showOnly(deviceID: string): void {
    this.HistoricalMode=true;
    if(this.currentantpath!=null) this.resetData()
    const latlngs = this.historicalpath.find(val => val.deviceID == deviceID)
    if (latlngs != null) {
      const path = antPath(latlngs.polyline.getLatLngs(), {
        "delay": 400,
        "dashArray": [
          42,
          48
        ],
        "weight": 4,
        "color": "#0000FF",
        "pulseColor": "#FFFFFF",
        "paused": false,
        "reverse": false,
        "hardwareAccelerated": true
      });
      this.hideHistoricalExceptMarker(deviceID);
      this.mainmap.fitBounds(latlngs.polyline.getBounds())
      path.addTo(this.mainmap)
      this.currentantpath = path;
    }
  }

  // public reloadHistorical(): void {
  //   console.log("reload historical");
  // }

  public loadhistorical(historical: Device): void {
      //try just show one
      if (historical != null) {
        // console.log(historical.data)
        const current = L.polyline(historical.locationData.map(val =>
          [parseFloat(val.location.latitude), parseFloat(val.location.longitude)]) as unknown as L.LatLngExpression[],
          { "smoothFactor": 0.1 });
        const markers: Array<L.Marker> = [];
        const length = historical.locationData.length;
        historical.locationData.forEach((val, i) => {
          const temp = L.marker([parseFloat(val.location.latitude), parseFloat(val.location.longitude)], { icon: this.bluecirlceicon });
          if (i == length - 1) temp.bindTooltip(historical.deviceName, { permanent: true, offset: [6,0] })
          markers.push(temp);
        })
        const newpoint = {
          deviceID: historical.deviceID,
          polyline: current,
          markers: markers
        } as MapHistoricalPoints
        this.historicalpath.push(newpoint);
        if (!this.HistoricalMode) this.addToMap(newpoint)
    }
  }

  public loadInnitial(deviceIDs: Device[]): void {
    deviceIDs.forEach(val => this.loadhistorical(val));
  }

  //loop through and add all things back to map
  public resetData(): void {
    this.HistoricalMode = false;
    this.historicalpath.forEach(val => this.addToMap(val))
    if (this.currentantpath != null) {
      this.currentantpath.remove();
    }
    if(this.mainmap!=null && this.mappolygons!=null) this.mainmap.fitBounds(this.mappolygons.getBounds())
  }

  public addToMap(mapdata: MapHistoricalPoints) {
    if (this.mainmap != null) {
      mapdata.polyline.addTo(this.mainmap)
      mapdata.markers.forEach(val => val.addTo(this.mainmap))
    }
  }
}
