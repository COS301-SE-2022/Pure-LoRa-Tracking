import { Component, ViewChild } from '@angular/core';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { MapCallerService } from '@master/client/map-apicaller';
import { Device, MapApiReserveResponse, ViewMapType } from '@master/shared-interfaces';

@Component({
  selector: 'master-reserve-view',
  templateUrl: './reserve-view.component.html',
  styleUrls: ['./reserve-view.component.scss'],
})
export class ReserveViewComponent {
  @ViewChild('reservemap') reservemap:ReserveMapComponent|null=null;
  ViewMapTypeInput: ViewMapType;
  Reserve:MapApiReserveResponse|null=null;
  LastestHistorical:Device[];
  ShowPolygon:boolean;



  constructor(private apicaller:MapCallerService) {
    this.LastestHistorical=[];
    this.ShowPolygon=true;
    this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
  }
  
  ngOnInit(): void {
    //get the reserve
    this.apicaller.getReserve("sf", "sdf").then(val => this.Reserve = val);
    this.apicaller.getHistorical("ss","ss",[]).then(val=>{
      this.LastestHistorical=val.data;
      this.reservemap?.loadInnitial(this.LastestHistorical);
    });
  }

  updateSensor(idinput:string){
    if(idinput==""){
      this.reservemap?.resetData();
    }
    else{
      this.reservemap?.showOnly(idinput);
    }
  }

  updateViewMapType(newval:string){
    if(newval=="norm") this.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
    else if(newval=="sat") this.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
  }
}
