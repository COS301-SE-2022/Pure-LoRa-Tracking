import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Timestamp } from 'rxjs';
import { StartEndTimestamps } from '@master/shared-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeviceNotifierService {

  // constructor() { 

  // }

  public SensorDeleted:Subject<string>=new Subject<string>();
  public LocatedSensor:Subject<string>=new Subject<string>();
  public LocatedGateway:Subject<string>=new Subject<string>();
  public ResetSensor:EventEmitter<void>=new EventEmitter();
  public Pantomap:EventEmitter<void>=new EventEmitter();
  public StartEndTimestamps:BehaviorSubject<StartEndTimestamps>=new BehaviorSubject<StartEndTimestamps>({
    startTime:0,
    endTime:0
  })

  getTimeStampsValue():StartEndTimestamps{
    return this.StartEndTimestamps.getValue();
  }

  getTimeStamps():Observable<StartEndTimestamps>{
    return this.StartEndTimestamps.asObservable();
  }

  setStartEndTime(newtimes:StartEndTimestamps):void{
    this.StartEndTimestamps.next(newtimes);
  }

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

  locateGateway(deviceid:string):void{
    this.LocatedGateway.next(deviceid);
  }

  getGatewayLocated():Observable<string>{
    return this.LocatedGateway.asObservable();
  }

  getPanToMap():Observable<void>{
    return this.Pantomap;
  }

  DoPanToMap():void{
    this.Pantomap.emit();
  }





  

}
