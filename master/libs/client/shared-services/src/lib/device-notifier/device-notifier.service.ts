import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceNotifierService {

  // constructor() { 

  // }

  public SensorDeleted:Subject<string>=new Subject<string>();
  public LocatedSensor:Subject<string>=new Subject<string>();
  public ResetSensor:EventEmitter<void>=new EventEmitter();

  getSensorDeleted():Observable<string>{
    return this.SensorDeleted.asObservable();
  }

  deleteSensor(deviceid:string):void{
    this.SensorDeleted.next(deviceid);
  }

  getResetSensorView():Observable<void>{
    return this.ResetSensor;
  }

  resetSensorView():void{
    this.ResetSensor.emit();
  }

  locateSensor(deviceid:string):void{
    this.LocatedSensor.next(deviceid);
  }

  getlocatedSensor():Observable<string>{
    return this.LocatedSensor.asObservable();
  }





  

}
