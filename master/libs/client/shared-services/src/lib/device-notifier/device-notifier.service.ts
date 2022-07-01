import { EventEmitter, Injectable } from '@angular/core';
import { MapApiReserveResponse, ReserveData } from '@master/shared-interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceNotifierService {

  // constructor() { 

  // }

  private SensorDeleted: Subject<string> = new Subject<string>();
  private LocatedSensor: Subject<string> = new Subject<string>();
  private ResetSensor: EventEmitter<void> = new EventEmitter();
  private CurrentReserve: Subject<ReserveData> = new Subject<ReserveData>();

  getSensorDeleted(): Observable<string> {
    return this.SensorDeleted.asObservable();
  }

  deleteSensor(deviceid: string): void {
    this.SensorDeleted.next(deviceid);
  }

  getResetSensorView(): Observable<void> {
    return this.ResetSensor;
  }

  resetSensorView(): void {
    this.ResetSensor.emit();
  }

  getlocatedSensor(): Observable<string> {
    return this.LocatedSensor.asObservable();
  }

  locateSensor(deviceid: string): void {
    this.LocatedSensor.next(deviceid);
  }

  getCurrentReserve():Observable<ReserveData>{
    return this.CurrentReserve.asObservable();
  }

  changeReserve(input:ReserveData):void{
    this.CurrentReserve.next(input);
  }







}
