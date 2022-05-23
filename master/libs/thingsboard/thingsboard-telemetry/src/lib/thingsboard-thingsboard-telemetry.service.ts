import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardTelemetryService {
  private token : string;
    constructor(private httpService: HttpService) {}

    setToken(token : string) : void {
        this.token = token;
    }

    getTelemetry(DeviceID : string, DeviceProfile: string) : Promise<AxiosResponse> {
        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return lastValueFrom(this.httpService.get(
            'http://localhost:8080/api/plugins/telemetry/'+DeviceProfile+'/'
            +DeviceID
            +'/values/timeseries',
            { headers: headersReq }
          )
          )
    }

    sendTelemetry(EntityID: string, DeviceType : string, latitude : number, longitude : number) : Promise<AxiosResponse> {
        const headersReq = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          };
          return lastValueFrom(this.httpService.post(
            "http://localhost:8080/api/plugins/telemetry/"+DeviceType+"/"+EntityID+"/timeseries/any",
            {
                "latitude": latitude,
                "longitude" : longitude
            },
            { headers: headersReq }
          ).pipe(
            map(
              Response => Response
            )
          )) 
    }

}