import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { DeviceNotifierService } from '@master/client/shared-services';
import { Device, ViewMapType } from '@master/shared-interfaces';


export interface Gateway {
  name: string;
  id: string;
  eui:string;
}

@Component({
  selector: 'master-reserve-panel',
  templateUrl: './reserve-panel.component.html',
  styleUrls: ['./reserve-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ReservePanelComponent implements OnInit {
  private _Devices:Device[];
  private _GateWays:Gateway[];
  private _ViewType:string;
  @Output() selectedSensorIDout=new EventEmitter<string>();
  @Input() reserveName="No Name Found";
  @Input()
  public get Devices(){
    return this._Devices;
  }
  public set Devices(devicearr:Device[]){
    this._Devices=devicearr;
    this.filteredSensors = this.Devices.map(sensorItem => {return sensorItem;})
  }
  openSensor=false;


  currentSensor = {
    name:"",
    id:"",
    }
  @Input()
  public get GateWays(){
    return this._GateWays;
  }
  public set GateWays(userinput:Gateway[]){
    this._GateWays=userinput;
    console.log("changes");
    this.filteredGateways= this.GateWays.map(item=>item);
  }
  
  deviceType = "sensors";
  selectedDeviceID="";
  searchString = "";
  filteredGateways:Gateway[]|undefined=[];

  filteredSensors:Device[]=[];

  constructor(private notifier:DeviceNotifierService) {
    this._Devices=[];
    this._GateWays=[];
    this._ViewType="norm"
    this.notifier.getSensorDeleted().subscribe(val=>{
      this.filteredSensors=this.filteredSensors.filter(curr=>curr.deviceID!=val);
      this.Devices=this.Devices.filter(curr=>curr.deviceID!=val);
    })
    //TODO still needs testing
    this.notifier.getResetSensorView().subscribe(()=>{
      this.selectedDeviceID="";
      this.selectedSensorIDout.emit("");
    })
    
  }

  getSelectedStyle(deviceId:string):string{
    if (this.selectedDeviceID==deviceId){
      return "#b8bdc7";
    }
    return "";
  }

  selectedSensor(deviceID:string){
    if(deviceID==this.selectedDeviceID){
      //reset
      this.selectedDeviceID="";
      this.selectedSensorIDout.emit("");
    }
    else {
      //click on
      const device=this.Devices.find(val=>val.deviceID==deviceID);
      if(device!=undefined&&device.locationData.length!=0){
        this.selectedDeviceID=deviceID;
        this.selectedSensorIDout.emit(deviceID);
      }
      else {
        //this might be changed if this part does not get location data anymore
        //TODO change to proper pop up @brandon-c-k
        alert("No location Data found");
      }
    }
  }

  selectedGateway(gatewayID:string){
    console.log("Change gateway");
  } 

  searchDevices():void{
     const searchLower = this.searchString.toLocaleLowerCase();
     this.filteredGateways = this._GateWays.filter(gatewayItem => gatewayItem.id.toLocaleLowerCase().search(searchLower)>=0);
     this.filteredSensors = this.Devices.filter(sensorItem=> sensorItem.deviceID.toLocaleLowerCase().search(searchLower)>=0);
      console.log(this.filteredGateways);
    }


  ngOnInit(): void {
    this.filteredGateways = this._GateWays.map(gatewayItem => {return gatewayItem;})
    this.filteredSensors = this.Devices.map(sensorItem => {return sensorItem;})
  }

  viewSensor(id:string,name: string):void{
    this.currentSensor = {
      name: name,
      id: id,
    }
    this.openSensor = true;
  }
  
}
