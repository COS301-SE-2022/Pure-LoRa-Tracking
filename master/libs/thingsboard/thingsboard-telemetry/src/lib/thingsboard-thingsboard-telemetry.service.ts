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

    const data = await lastValueFrom(this.httpService.get(url, { headers: headersReq }));

    return this.buildTelemetryResults(
      data['data']
    );
  }

  buildTelemetryResults(items): TelemetryResult[] {
    const TelList: TelemetryResult[] = new Array<TelemetryResult>();
    for (let i = 0; i < items['longitude'].length; i++) {
      TelList.push({
        longitude: items['longitude'][i]['value'],
        latitude: items['latitude'][i]['value'],
        time: items['latitude'][i]['ts'],
      });
    }
    return TelList;
  }

  sendTelemetry(
    EntityID: string,
    DeviceType: string,
    latitude: number,
    longitude: number
  ): Promise<AxiosResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return lastValueFrom(
      this.httpService
        .post(
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
        .pipe(map((Response) => Response))
    );
  }
}

export interface TelemetryResult {
  time: number;
  latitude: number;
  longitude: number;
}
