import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardTelemetryService {
  private token : string;
    constructor(private httpService: HttpService) {}

    setToken(token : string) : void {
        this.token = token;
    }

    getTelemetry(EntityID : string) : Observable<AxiosResponse['data']> {
        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return this.httpService.get(
            'http://localhost:8080/api/plugins/telemetry/DEVICE_PROFILE/'
            +EntityID
            +'/values/timeseries',
            { headers: headersReq }
          ).pipe(
            map(
              Response => Response.data
            )
          ) 
    }

    sendTelemetry(EntityID: string, DeviceType : string, latitude : number, longitude : number) : Observable<AxiosResponse['data']> {
        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return this.httpService.post(
            'http://localhost:8080/api/plugins/telemetry/'+
            +DeviceType+'/'+
            EntityID+
            '/timeseries/any',
            {
                latitude : latitude,
                longitude : longitude
            },
            { headers: headersReq }
          ).pipe(
            map(
              Response => Response.data
            )
          ) 
    }

}