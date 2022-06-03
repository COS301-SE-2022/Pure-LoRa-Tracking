import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { MapApiHistoricalData, MapApiHistoricalResponse, MapApiLatestResponse, MapApiReserveResponse, MapHistoricalPoints, MapRender, MarkerView, ViewMapType, } from '@master/shared-interfaces';
import * as L from 'leaflet';
@Component({
  selector: 'master-reserve-map',
  templateUrl: './reserve-map.component.html',
  styleUrls: ['./reserve-map.component.scss'],
})
export class ReserveMapComponent implements OnInit, OnChanges {

  // @Input() Latest: MapApiLatestResponse | null = null;
  @Input() Reserve: MapApiReserveResponse | null = null;
  @Input() LatestData: MapApiHistoricalData|null = null;
  @Input() MapRenderInput: MapRender;
  @Input() ViewMapTypeInput: ViewMapType;
  @Input() MarkerViewInput: MarkerView;
  @Input() ShowMarkers: boolean;
  @Input() ShowPolygon: boolean;
  @Input() HistoricalMode: boolean;
  @Input() HistoricalDataID:number;
  public mainmap: any = null;
  public maptiles: any = null;
  // private mapmarkers: Array<L.Marker<any>> = [];
  private mappolygons: L.Polygon | null = null;
  private historicalpath: Array<MapHistoricalPoints> = [];
  private bluecirlceicon: L.Icon=new L.Icon({
    iconUrl:"assets/MapIcons/BaseCircle.png",
    iconSize:[20,20]
  });


  constructor() {
    //set default map options
    this.MapRenderInput = MapRender.ALL;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.MarkerViewInput = MarkerView.DEFAULT_MARKER;
    this.ShowMarkers = true;
    this.ShowPolygon = true;
    this.HistoricalMode = false;
    this.HistoricalDataID=-1;
  }

  ngOnInit(): void {
    console.log("Component loaded");
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    //assume that if reserve is changed, reload everything
    if (Object.prototype.hasOwnProperty.call(changes,"Reserve")) {
      this.loadmap();
      this.loadmaptiles();
      this.loadPolygons();
      this.showpolygon();
    }
    else {
      //using else if as these are single changes
      if (Object.prototype.hasOwnProperty.call(changes,"ViewMapTypeInput")) {
        this.loadmaptiles();
      }
      else if (Object.prototype.hasOwnProperty.call(changes,"ShowPolygon")) {
        if (this.ShowPolygon) {
          this.showpolygon();
        } else {
          this.hidepolygon();
        }
      }
      else if(Object.prototype.hasOwnProperty.call(changes,"HistoricalDataID")){
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
    if (this.mappolygons != null) {
      this.mappolygons.addTo(this.mainmap);
    }
  }

  public hidepolygon(): void {
    if (this.mappolygons != null) {
      this.mappolygons.remove();
    }
  }



  public hidehistorical(deviceID: string): void {
    const point = this.historicalpath.find(val => val.deviceID == deviceID);
    if (point != null) {
      //remove markers
      point.markers.forEach(val=>val.remove())
      point.polyline.remove();
      this.historicalpath=this.historicalpath.filter(val=>val.deviceID!=deviceID)
      if (this.historicalpath.length == 0) {
        this.HistoricalMode = false;
        // this.showmarkers();
      }
    }
  }

  public showOnly(deviceID:string):void{
    console.log("Show only")
  }

  public displayhistorical(historical: MapApiHistoricalResponse): void {
    if (historical.data != null) {
      // this.hidemarkers();
      this.HistoricalMode = true;
      //try just show one
      if (historical.data != undefined && historical.data.locations!=null) {
        // console.log(historical.data)
        const current = L.polyline(historical.data.locations.map(val =>
           [parseFloat(val.latitude), parseFloat(val.longitude)]) as unknown as L.LatLngExpression[], 
           { "smoothFactor": 0.1 });
        const markers:Array<L.Marker>=[];
        const length=historical.data.locations.length;
        historical.data.locations.forEach((val,i)=>{
          const temp=L.marker([parseFloat(val.latitude),parseFloat(val.longitude)],{icon:this.bluecirlceicon});
          if(historical.data != undefined)if(i==length-1)temp.bindTooltip(historical.data.deviceID,{permanent:true,offset:[0,12]})
          markers.push(temp);
          temp.addTo(this.mainmap);
        })
        const newpoint = {
          deviceID: historical.data?.deviceID,
          polyline: current,
          markers: markers
        } as MapHistoricalPoints
        this.historicalpath.push(newpoint);
        current.addTo(this.mainmap);
      }
    }
  }

}
