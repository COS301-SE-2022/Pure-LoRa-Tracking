import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardTelemetryService {
    constructor(private token : string, private httpService: HttpService) {}

    getTelemetry(EntityID : string) : AxiosResponse['data'] {
        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return this.httpService.post(
            'http://localhost:8080/api/plugins/telemetry/DEVICE_PROFILE/'
            +EntityID
            +'/values/timeseries',
            {},
            { headers: headersReq }
          ).pipe(
            map(
              Response => Response.data
            )
          ) 
    }

    sendTelemetry(EntityID: string, DeviceType : string, latitude : number, longitude : number) : AxiosResponse['data'] {
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