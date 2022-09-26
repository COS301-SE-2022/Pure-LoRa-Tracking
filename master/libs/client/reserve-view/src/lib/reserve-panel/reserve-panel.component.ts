import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { DeviceNotifierService } from '@master/client/shared-services';
import { Device, ViewMapType, Gateway } from '@master/shared-interfaces';
import { ReserveInfo } from '../reserve-view/reserve-view.component';


@Component({
  selector: 'master-reserve-panel',
  templateUrl: './reserve-panel.component.html',
  styleUrls: ['./reserve-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ReservePanelComponent implements OnInit {
  private _Devices: Device[];
  private _GateWays: Gateway[];
  private _ViewType: string;
  @Input() selectedReserve = "";
  @Input() reserveList: ReserveInfo[];
  @Input()
  public get Devices() {
    return this._Devices;
  }
  public set Devices(devicearr: Device[]) {
    this._Devices = devicearr;
    this.filteredSensors = this.Devices;
  }
  openSensor = false;

  @Output() selectedReserveChange = new EventEmitter<string>();

  currentSensor = {
    name: "",
    id: "",
  }
  @Input()
  public get GateWays() {
    return this._GateWays;
  }
  public set GateWays(userinput: Gateway[]) {
    this._GateWays = userinput;
    console.log("changes");
    this.filteredGateways = this.GateWays;
  }

  deviceType = "sensors";
  selectedDeviceID = "";
  searchString = "";
  filteredGateways: Gateway[] | undefined = [];

  filteredSensors: Device[] = [];
  showSensors: boolean;
  showGateways: boolean;

  constructor(public notifier: DeviceNotifierService) {
    this._Devices = [];
    this._GateWays = [];
    this._ViewType = "norm"
    this.notifier.getSensorDeleted().subscribe(val => {
      this.filteredSensors = this.filteredSensors.filter(curr => curr.deviceID != val);
      this.Devices = this.Devices.filter(curr => curr.deviceID != val);
    })
    //TODO still needs testing
    this.notifier.getResetSensorView().subscribe(() => {
      this.selectedDeviceID = "";
    });
    this.notifier.getPanToMap().subscribe(() => {
      //this might need to change if we pantomap in other places
      this.selectedDeviceID = "";
    });
    this.reserveList = [];
    this.showSensors = true;
    this.showGateways = false;
  }

  getSelectedStyle(deviceId: string): string {
    if (this.selectedDeviceID == deviceId) {
      return "#b8bdc7";
    }
    return "";
  }

  selectedSensor(deviceID: string) {
    if (deviceID == this.selectedDeviceID) {
      //reset
      this.selectedDeviceID = "";
      this.notifier.resetSensorView()
    }
    else {
      //click on
      const device = this.Devices.find(val => val.deviceID == deviceID);
      if (device != undefined) {
        this.selectedDeviceID = deviceID;
        this.notifier.locateSensor(deviceID);//send through even if no data to get error popup if needed
        //might have to change if we dont store the locations here anymore
        if (device.locationData.length == 0) {
          this.selectedDeviceID = "";
          this.notifier.resetSensorView()
        }
      }

    }
  }

  selectedGateway(gatewayID: string) {
    const device = this.Devices.find(val => val.deviceID == this.selectedDeviceID);
    if (device != undefined) {
      //the current selected device is a sensor
      this.selectedDeviceID = "";
      this.notifier.resetSensorView()
    }
    const gatewaydevice = this.GateWays.find(val => val.id == gatewayID);
    if (gatewaydevice != undefined) {
      if (gatewayID == this.selectedDeviceID) {
        this.notifier.DoPanToMap();
      }
      else {
        if (gatewaydevice.location != undefined) {
          this.selectedDeviceID = gatewayID;
          this.notifier.locateGateway(gatewayID);
        }
        else{
          alert("No location data found");
        }
      }
    }

    console.log("Change gateway");
  }

  searchDevices(): void {
    const searchLower = this.searchString.toLocaleLowerCase();
    this.filteredGateways = this._GateWays.filter(gatewayItem => gatewayItem.id.toLocaleLowerCase().search(searchLower) >= 0);
    this.filteredSensors = this.Devices.filter(sensorItem => sensorItem.deviceID.toLocaleLowerCase().search(searchLower) >= 0);
    console.log(this.filteredGateways);
  }


  ngOnInit(): void {
    this.filteredGateways = this._GateWays.map(gatewayItem => { return gatewayItem; })
    this.filteredSensors = this.Devices.map(sensorItem => { return sensorItem; })
  }


  viewSensor(event:{id:string,name: string}):void{
    this.currentSensor = {
      name: event.name,
      id: event.id,
    }
    this.openSensor = true;
  }


  reserveChanged(): void {
    this.selectedReserveChange.emit(this.selectedReserve);
    console.log("changed");
  }

}
