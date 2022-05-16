import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { MapApiLatestResponse, MapApiReserveResponse, MapRender, ViewMapType, } from '@master/shared-interfaces';
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
  private mainmap: any = null;
  private maptiles: any = null;


  constructor() {
    //set default map options
    this.MapRenderInput = MapRender.ALL;
    this.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //assume that if reserve is changed, reload everything
    console.log(changes);

    if (changes.hasOwnProperty("Reserve")) {
      this.loadmap();
      this.loadmaptiles();
      this.loadMarkers();//maybe remove for double call
    }
    else {
      if (changes.hasOwnProperty("Latest")) {
        this.loadMarkers();
      }
      if (changes.hasOwnProperty("ViewMapTypeInput")) {
        this.loadmaptiles();
      }
    }

  }


  private loadmaptiles(): void {

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
            maxZoom: 22,
            minZoom: 2,
            attribution:
              'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          }
        );
      }
      this.maptiles.addTo(this.mainmap);
    }
  }


  private loadmap(): void {
    if (this.Reserve?.data != null) {
      if (this.mainmap != null) this.mainmap.remove();//if change to main map reload
      this.mainmap = L.map('map', {
        center: [
          parseFloat(this.Reserve?.data?.center.latitude),
          parseFloat(this.Reserve?.data?.center.longitude),
        ],
        zoom: 19,
      });

      //load the polygon points
      if (
        this.Reserve.data.location != null &&
        this.Reserve.data.location.length > 2
      ) {
        var points = this.Reserve.data.location.map((val) => [
          parseFloat(val.latitude),
          parseFloat(val.longitude),
        ]) as unknown as L.LatLngExpression[];
        console.log(points);
        L.polygon(points).addTo(this.mainmap);
      }
    }
  }


  //load the map markers
  private loadMarkers(): void {
    if (this.Latest != null && this.Latest.data != null) {
      if (this.mainmap != null) {
        const pipes = new DatePipe('en-UK');
        this.Latest.data.forEach((curr) => {
          var marker = L.marker([
            parseFloat(curr.locationData.location.latitude),
            parseFloat(curr.locationData.location.longitude),
          ])
            .addTo(this.mainmap)
            .bindPopup(
              `<b>${curr.deviceID}:</b> Location as of ${pipes.transform(
                curr.locationData.timeStamp,
                'full'
              )}`
            );
        });
      }
    }
  }

  ngOnInit(): void {
    // this.loadmap();
    // this.loadMarkers();
  }
}
