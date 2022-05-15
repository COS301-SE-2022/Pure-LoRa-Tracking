import { Component, OnInit,Input } from '@angular/core';
import { MapApiLatestResponse, MapApiReserveResponse } from '@master/shared-interfaces';
import * as L from "leaflet";
@Component({
  selector: 'reserve-map',
  templateUrl: './reserve-map.component.html',
  styleUrls: ['./reserve-map.component.scss'],
})
export class ReserveMapComponent implements OnInit {
  @Input() Reserve: MapApiReserveResponse|null = null;
  @Input() Latest:MapApiLatestResponse|null=null;
  
  constructor() {}
  private mainmap:any;

  private loadmap(): void {
    console.log(this.Reserve);
    if(this.Reserve?.data!=null){
    this.mainmap = L.map('map', {
      center: [ 
        parseFloat(this.Reserve?.data?.center.latitude), 
        parseFloat(this.Reserve?.data?.center.longitude)
         ],
      zoom: 19
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.mainmap);
  }
  }

  ngOnInit(): void {
    this.loadmap();

  }
}
