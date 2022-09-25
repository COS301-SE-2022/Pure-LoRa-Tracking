import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { data } from '@tensorflow/tfjs-node';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardTelemetryService {
  private token: string;
  private ThingsBoardURL = process.env.TB_URL || 'http://localhost:9090/api';
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
    ptype = 'TRI',
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
        '&keys=ts,latitude,longitude,pType';
    } else {
      url =
        this.ThingsBoardURL +
        '/plugins/telemetry/' +
        DeviceProfile +
        '/' +
        DeviceID +
        '/values/timeseries';
    }

    //console.log(url)

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
        telemetryResults: this.buildTelemetryResults(resp.data, ptype),
      },
    };
  }

  //////////////////////////////////////////////////////////////////

  async getSensorData(
    DeviceID: string,
    DeviceProfile: string,
    timeStart?: number,
    timeStop?: number
  ): Promise<SensorDataResponse> {
    let url = '';

    if (timeStop == undefined) {
      timeStop = new Date().getTime();
    }

    if (timeStart == undefined) {
      timeStart = new Date(timeStop - 24 * 60 * 60 * 1000).getTime();
    }

    //Get key attributes.
    url =
      this.ThingsBoardURL +
      '/plugins/telemetry/' +
      DeviceProfile +
      '/' +
      DeviceID +
      '/keys/timeseries';

    const keyResponse = await lastValueFrom(
      this.httpService.get(url, { headers: this.headersReq })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });

    if (keyResponse == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: keyResponse,
      };
    else if (keyResponse.status != 200) {
      return {
        status: keyResponse.response.status,
        explanation: keyResponse.response.data.message,
      };
    }

    if(keyResponse.data==undefined||keyResponse.data==null){
      return {
        status:200,
        data:"",
        explanation:"No Keys Found"
      }
    }


    const sorter = ['fcnt', 'rssi', 'snr'];
    const newarr = keyResponse.data.filter(
      (curr) => curr.startsWith('data_') || sorter.includes(curr)
    );

    let keys = '';

    for (let i = 0; i < newarr.length - 1; i++) keys += newarr[i] + ',';

    keys += newarr[newarr.length - 1];

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
      '&keys=' +
      keys;

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
      data: resp.data,
    };
  }

  //////////////////////////////////////////////////////////////////

  buildTelemetryResults(items, pType='TRI'): TelemetryResult[] {
    console.log(items)
    if (items['longitude'] == undefined) return [];
    const TelList: TelemetryResult[] = new Array<TelemetryResult>();
    for (let i = 0; i < items['longitude'].length; i++) {
      if(items['pType'][i]['value']==pType)
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
          ...TelemetryJSON,
        },
        {}
      )
    ).catch((error) => {
      if (error.response == undefined) return { status: 500 };
      return { status: error.response.status };
    });
    return resp.status;
  }

  ////////////////////////////////////////////////////////////////////

  async clearTelemetry(deviceID:string) {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const url = this.ThingsBoardURL + '/plugins/telemetry/DEVICE/'+deviceID+'/timeseries/delete?deleteAllDataForKeys=true';

    const resp = await lastValueFrom(
      this.httpService.delete(url, { headers: headersReq })
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

export interface SensorDataResponse {
  status: number;
  explanation: string;
  data?: any;
}
