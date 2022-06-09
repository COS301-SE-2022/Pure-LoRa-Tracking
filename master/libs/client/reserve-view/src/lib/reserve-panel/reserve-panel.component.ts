import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Input, Output, ViewContainerRef,InjectionToken } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit, Injector } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Device, ViewMapType } from '@master/shared-interfaces';
import { SensorDeviceViewComponent } from '@master/client/shared-ui/components-ui';
import { Subject } from 'rxjs';
export interface GatewayProps {
  name: string;
  id: string;
  last: Date;
}
export const OVERLAY_DATA = new InjectionToken<SensorInformation>("OVERLAY_DATA");

export interface SensorInformation {
  name: string;
  id: string;
}

@Component({
  selector: 'master-reserve-panel',
  templateUrl: './reserve-panel.component.html',
  styleUrls: ['./reserve-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ReservePanelComponent implements OnInit {
  private _Devices:Device[];
  private _ViewType:string;
  @Output() selectedSensorIDout=new EventEmitter<string>()

  @Input()
  public get Devices(){
    return this._Devices;
  }
  public set Devices(devicearr:Device[]){
    this._Devices=devicearr;
    this.filteredSensors = this.Devices.map(sensorItem => {return sensorItem;})
  }


  reserveName = "Reserve Name";

  gateways: GatewayProps[] = [
    {
      name: "Gateway A",
      id: "45ad2334d",
      last: new Date('1/1/16'),
    },
    {
      name: "Gateway B",
      id: "asda34",
      last: new Date('2/1/16'),
    },
    {
      name: "Gateway C",
      id: "45agdas",
      last: new Date('1/1/16'),
    },{
      name: "Gateway D",
      id: "gfjggdfg",
      last: new Date('3/1/16'),
    }
  ];

  deviceType = "sensors";
  selectedDeviceID="";
  searchString = "";
  filteredGateways:GatewayProps[]|undefined=[];

  filteredSensors:Device[]|null=[];

  openSensor = false;

  constructor(private overlay: Overlay, private overlayContainerRef: ViewContainerRef,private injector: Injector) {
    this._Devices=[];
    this._ViewType="norm"
  }

  

  getSelectedStyle(deviceId:string):string{
    if (this.selectedDeviceID==deviceId){
      return "#b8bdc7";
    }
    return "";
  }

  selectedSensor(deviceID:string){
    if(deviceID==this.selectedDeviceID){
      //click on
      this.selectedDeviceID="";
      this.selectedSensorIDout.emit("");
    }
    else {
      //reset
      this.selectedDeviceID=deviceID;
      this.selectedSensorIDout.emit(deviceID);
    }
  }

  selectedGateway(gatewayID:string){
    console.log("Change gateway");
  } 

  searchDevices():void{
     const searchLower = this.searchString.toLocaleLowerCase();
     this.filteredGateways = this.gateways.filter(gatewayItem => gatewayItem.id.toLocaleLowerCase().search(searchLower)>=0);
     this.filteredSensors = this.Devices.filter(sensorItem=> sensorItem.deviceID.toLocaleLowerCase().search(searchLower)>=0);
      console.log(this.filteredGateways);
    }


  ngOnInit(): void {
    this.filteredGateways = this.gateways.map(gatewayItem => {return gatewayItem;})
    this.filteredSensors = this.Devices.map(sensorItem => {return sensorItem;})
  }

  viewSensor():void{
    const configs = new OverlayConfig({hasBackdrop:false});
    const overlayRef = this.overlay.create(configs);
    const refref = overlayRef.attach(new ComponentPortal(SensorDeviceViewComponent,this.overlayContainerRef,this.createInjector({name:"abcdef",id:"45454"})));
    refref.instance.closeOverlay.subscribe(()=>overlayRef.dispose());
    
  }

  private createInjector(dataToPass:SensorInformation): Injector {
    return Injector.create({parent: this.injector, providers:[{provide:OVERLAY_DATA,useValue: dataToPass}]});
  }

}
export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data: R;
 }

export class sensorOverlayRef<R = any, T = any>{
  
  afterClosed$ = new Subject<OverlayCloseEvent<R>>();
  constructor(public overlay: OverlayRef,public content: string , public data: T){
    
  }

  private _close(type: 'backdropClick'|'close', data:R){
    this.overlay.dispose();
    this.afterClosed$.next({
      type,
      data
    });

    this.afterClosed$.complete();
  }

  close(data: R){
    this._close('close',data);
  }
}
