import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { MapApiHistoricalResponse, MapApiLatestResponse, MapApiReserveResponse, MapRender, MarkerView, ViewMapType, } from '@master/shared-interfaces';
import * as L from 'leaflet';
@Component({
  selector: 'reserve-map',
  templateUrl: './reserve-map.component.html',
  styleUrls: ['./reserve-map.component.scss'],
})
export class ReserveMapComponent implements OnInit, OnChanges {

  @Input() Latest: MapApiLatestResponse | null = null;
  @Input() Reserve: MapApiReserveResponse | null = null;
  @Input() MapRenderInput: MapRender;
  @Input() ViewMapTypeInput: ViewMapType;
  @Input() MarkerViewInput: MarkerView;
  @Input() ShowMarkers: boolean;
  @Input() ShowPolygon: boolean;
  @Input() HistoricalMode: boolean;
  @Input() CurrentHistorical:Array<string>=[];
  private mainmap: any = null;
  private maptiles: any = null;
  private mapmarkers: Array<L.Marker<any>> = [];
  private mappolygons: L.Polygon | null = null;
  private historicalpath: Array<L.Polyline>=[];
  private historicalpoints: Array<L.LatLngExpression>=[];

  constructor() {
    //set default map options
    this.MapRenderInput = MapRender.ALL;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
    this.MarkerViewInput = MarkerView.DEFAULT_MARKER;
    this.ShowMarkers = true;
    this.ShowPolygon = true;
    this.HistoricalMode = false;
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    //assume that if reserve is changed, reload everything
    if (changes.hasOwnProperty("Reserve")) {
      this.loadmap();
      this.loadmaptiles();
      this.loadMarkers();//maybe remove for double call
      this.showmarkers();
      this.loadPolygons();
      this.showpolygon();
    }
    else {
      //using else if as these are single changes

      if (changes.hasOwnProperty("Latest")) {
        this.loadMarkers();
        this.showmarkers();
      }
      else if (changes.hasOwnProperty("ViewMapTypeInput")) {
        this.loadmaptiles();
      }
      else if (changes.hasOwnProperty("ShowMarkers")) {
        if (this.ShowMarkers) {
          this.showmarkers();
        } else {
          this.hidemarkers();
        }
      }
      else if (changes.hasOwnProperty("ShowPolygon")) {
        if (this.ShowPolygon) {
          this.showpolygon();
        } else {
          this.hidepolygon();
        }
      }
      else if (changes.hasOwnProperty("CurrentHistorical")) {

      }
      else if (changes.hasOwnProperty("ShowHistorical")) {

      }
    }

  }

  //MAP

  private loadmap(): void {
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
    console.log(this.mainmap);
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


  //MAP MARKERS

  //load the map markers
  private loadMarkers(): void {
    if (this.Latest != null && this.Latest.data != null && this.mainmap != null) {
      const pipes = new DatePipe('en-UK');

      //if there is markers, destroy them
      if (this.mapmarkers.length > 0) {
        this.mapmarkers = [];
      }

      this.Latest.data.forEach((curr) => {
        var marker = L.marker([
          parseFloat(curr.locationData.location.latitude),
          parseFloat(curr.locationData.location.longitude),
        ])
          .bindPopup(
            `<b>${curr.deviceID}:</b> Location as of ${pipes.transform(
              curr.locationData.timeStamp,
              'full'
            )}`
          );
        this.mapmarkers.push(marker);
      });
    }
  }

  private showmarkers(): void {
    this.mapmarkers.forEach((curr) => { curr.addTo(this.mainmap) })
  }

  private hidemarkers(): void {
    this.mapmarkers.forEach((curr) => curr.remove());
  }


  //HISTORICAL

  // private loadHistorical(): void {
  //   if (this.HistoricalMode && this.CurrentHistorical != null) {
      
  //   }
  // }

  // private updateHistoical(): void {
  //   if(this.CurrentHistorical!=null && this.CurrentHistorical.data!=null){
  //     this.historicalpoints=this.CurrentHistorical.data.map((val)=>[
        
  //     ]) as unknown as L.LatLngExpression[]
  //   }
  // }

  private hidehistorical(): void {

  }

  public displayhistorical(historical:MapApiHistoricalResponse):void{
    console.log(historical)
    this.hidemarkers();
    this.HistoricalMode=true;
    //try just show one
    if(historical.data!=null){
      console.log(historical.data[0])
      var current=L.polyline(historical.data[0].locations.map(val=>[parseFloat(val.latitude),parseFloat(val.longitude)]) as unknown as L.LatLngExpression[],{"smoothFactor":0.1,"color":"#fcba03"});
      this.historicalpath.push(current);
      current.addTo(this.mainmap);
    }
  }

}
