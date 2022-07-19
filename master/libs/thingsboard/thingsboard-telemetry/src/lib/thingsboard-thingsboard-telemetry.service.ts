import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardTelemetryService {
  private token: string;
  private ThingsBoardURL = process.env.TB_URL || 'http://localhost:8080/api';
  constructor(private httpService: HttpService) {}
  private headersReq = {};

  setToken(token: string): void {
    this.headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
  }

  async getTelemetry(
    DeviceID: string,
    DeviceProfile: string,
    timeStart?: number,
    timeStop?: number
  ): Promise<TelemetryResponse> {
    let url = '';
    if (timeStart != undefined) {
      url =
        this.ThingsBoardURL +
        '/plugins/telemetry/' +
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
        this.ThingsBoardURL +
        '/plugins/telemetry/' +
        DeviceProfile +
        '/' +
        DeviceID +
        '/values/timeseries';
    }

    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: this.headersReq })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });
    if (resp == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: resp,
      };
    else if (resp.status != 200) {
      return {
        status: resp.response.status,
        explanation: resp.response.data.message,
      };
    }
    return {
      status: resp.status,
      explanation: 'ok',
      data: {
        telemetryResults: this.buildTelemetryResults(resp.data),
      },
    };
  }

  //////////////////////////////////////////////////////////////////

  buildTelemetryResults(items): TelemetryResult[] {
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

  //////////////////////////////////////////////////////////////////

  async sendTelemetry(
    EntityID: string,
    DeviceType: string,
    latitude: number,
    longitude: number
  ): Promise<TelemetryResponse> {
    const resp = await lastValueFrom(
      this.httpService.post(
        this.ThingsBoardURL +
          '/plugins/telemetry/' +
          DeviceType +
          '/' +
          EntityID +
          '/timeseries/any',
        {
          timestamp: +new Date(),
          latitude: latitude,
          longitude: longitude,
        },
        { headers: this.headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });

    if (resp == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: resp,
      };
    else if (resp.status != 200) {
      return {
        status: resp.response.status,
        explanation: resp.response.data.message,
      };
    }
    return {
      status: resp.status,
      explanation: 'ok',
    };
  }

  //////////////////////////////////////////////////////////////////

  async sendJsonTelemetry(
    EntityID: string,
    DeviceType: string,
    TelemetryJSON: string
  ): Promise<TelemetryResponse> {
    const resp = await lastValueFrom(
      this.httpService.post(
        this.ThingsBoardURL +
          '/plugins/telemetry/' +
          DeviceType +
          '/' +
          EntityID +
          '/timeseries/any',
        {
          timestamp: +new Date(),
          DeviceData: TelemetryJSON,
        },
        { headers: this.headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });

    if (resp == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: resp,
      };
    else if (resp.status != 200) {
      return {
        status: resp.response.status,
        explanation: resp.response.data.message,
      };
    }
    return {
      status: resp.status,
      explanation: 'ok',
    };
  }

  //////////////////////////////////////////////////////////////////

  async V1sendJsonTelemetry(
    accessToken: string,
    TelemetryJSON: any
  ): Promise<number> {
    const resp = await lastValueFrom(
      this.httpService.post(
        this.ThingsBoardURL + '/v1/' + accessToken + '/telemetry',
        {
          timestamp: +new Date(),
          DeviceData: TelemetryJSON,
        },
        { headers: this.headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return { status: 500 };
      return { status: error.response.status };
    });
    return resp.status;
  }
}

export interface TelemetryResult {
  timestamp: number;
  latitude: number;
  longitude: number;
}

export interface TelemetryResponse {
  status: number;
  explanation: string;
  data?: {
    telemetryResults?: TelemetryResult[];
  };
}
