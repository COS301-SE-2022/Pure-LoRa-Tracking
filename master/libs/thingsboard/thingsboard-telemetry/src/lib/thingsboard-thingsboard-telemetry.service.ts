import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable, Timestamp } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardTelemetryService {
  private token: string;
  constructor(private httpService: HttpService) {}

  setToken(token: string): void {
    this.token = token;
  }

  async getTelemetry(
    DeviceID: string,
    DeviceProfile: string,
    timeStart?: number,
    timeStop?: number
  ): Promise<TelemetryResult[]> {
    if (this.token == '') return [];

    let url = '';
    if (timeStart != undefined) {
      url =
        'http://localhost:8080/api/plugins/telemetry/' +
        DeviceProfile +
        '/' +
        DeviceID +
        '/values/timeseries' +
        '?startTs=' +
        timeStart +
        '&endTs=' +
        timeStop +
        '&keys=ts,latitude,longitude';
    } else {
      url =
        'http://localhost:8080/api/plugins/telemetry/' +
        DeviceProfile +
        '/' +
        DeviceID +
        '/values/timeseries';
    }

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const data = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
    ).catch((error) => {
      if (error.response == undefined) return { status: 500 };
      return { status: error.response.status };
    });

    if (data['status'] != 200) return [];
    else return this.buildTelemetryResults(data['data']);
  }

  buildTelemetryResults(items: AxiosResponse): TelemetryResult[] {
    if (items['longitude'] == undefined) return [];
    const TelList: TelemetryResult[] = new Array<TelemetryResult>();
    for (let i = 0; i < items['longitude'].length; i++) {
      TelList.push({
        longitude: items['longitude'][i]['value'],
        latitude: items['latitude'][i]['value'],
        timestamp: items['latitude'][i]['ts'],
      });
    }
    return TelList;
  }

  async sendTelemetry(
    EntityID: string,
    DeviceType: string,
    latitude: number,
    longitude: number
  ): Promise<boolean> {
    if (this.token == '') return;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.post(
        'http://localhost:8080/api/plugins/telemetry/' +
          DeviceType +
          '/' +
          EntityID +
          '/timeseries/any',
        {
          timestamp: +new Date(),
          latitude: latitude,
          longitude: longitude,
        },
        { headers: headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return { status: 400 };
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });
    return resp.status == 200;
  }

  
  async sendJsonTelemetry(
    EntityID: string,
    DeviceType: string,
    TelemetryJSON: string
  ): Promise<boolean> {
    if (this.token == '') return;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.post(
        'http://localhost:8080/api/plugins/telemetry/' +
          DeviceType +
          '/' +
          EntityID +
          '/timeseries/any',
        {
          timestamp: +new Date(),
          DeviceData : TelemetryJSON
        },
        { headers: headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return { status: 400 };
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });
    return resp.status == 200;
  }
}

export interface TelemetryResult {
  timestamp: number;
  latitude: number;
  longitude: number;
}
