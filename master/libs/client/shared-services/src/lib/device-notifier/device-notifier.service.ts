import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceNotifierService {

  // constructor() { 

  // }

  private SensorDeleted:Subject<string>=new Subject<string>();

  getSensorDeleted():Observable<string>{
    return this.SensorDeleted.asObservable();
  }

  deleteSensor(deviceid:string):void{
    this.SensorDeleted.next(deviceid);
  }


  

}
