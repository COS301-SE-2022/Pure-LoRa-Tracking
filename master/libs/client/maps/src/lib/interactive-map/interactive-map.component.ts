/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapApiReserveResponse,MapApiLatestResponse } from '@master/shared-interfaces';
import { devicemarker } from './devicemarker';

@Component({
  selector: 'master-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss'],
})
export class InteractiveMapComponent implements OnInit {
  @Input() Reserve: MapApiReserveResponse|null = null;
  @Input() Latest:MapApiLatestResponse|null=null;
  MapOutline: Array<google.maps.LatLng> | null = null;
  CurrentLocations: Array<devicemarker> | null = null;
  apiready: Observable<boolean>;
  center: google.maps.LatLngLiteral = {
    lat: -25.739803433797874,
    lng: 27.91649993973261,
  };
  zoom = 15;
  test="jack";
  constructor(private http: HttpClient) {
    //checks if api is loaded and working correctly
    this.apiready = http
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAAloEcLyO1ZY1dRgopJx63GX-Bvh3P7fE',
        'callback'
      )
      .pipe(
        map(() => {
          //set map view
          if (this.Reserve == null) {
            //show error message of no input
          } else if (this.Reserve.code != 200) {
            //show error message of bad response code
          } else if(this.Reserve.data!=null){
            this.center = {
              lat: parseFloat(this.Reserve.data?.center.latitude),
              lng: parseFloat(this.Reserve.data?.center.longitude),
            };
            if (this.Reserve.data?.location.length > 2) {
              this.MapOutline = this.Reserve.data?.location.map(
                (x: any) => {return {
                  lat: parseFloat(x.latitude),
                  lng: parseFloat(x.longitude)
                } as unknown as google.maps.LatLng}
              );
            }
          }

          //set markers, this is optional
          if(this.Latest!=null && this.Latest.code==200){
              if(this.Latest.data!=null){
                this.CurrentLocations=this.Latest.data?.map((x:any)=>{
                  return {
                    devicename:x.deviceID,
                    location:{
                      lat:parseFloat(x.locationData.location.latitude),
                      lng:parseFloat(x.locationData.location.longitude),
                    } as unknown as google.maps.LatLng
                  } as unknown as devicemarker
                })
              }
          }

          return true;
        }),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
  }
}
