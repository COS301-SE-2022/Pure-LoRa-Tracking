import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardDeviceService {
  private token: string;
  private ThingsBoardURL: string = process.env.TB_URL || 'http://localhost:8080/api';
  constructor(private httpService: HttpService) {
    this.token = '';
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  setToken(token: string): void {
    this.token = token;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  async getCustomerDevices(
    page: number,
    pageSize: number,
    customerID: string
  ): Promise<deviceResponse> {
    const url =
      this.ThingsBoardURL +
      '/customer/' +
      customerID +
      '/deviceInfos?pageSize=' +
      pageSize +
      '&page=' +
      page +
      '&customerId=' +
      customerID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
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
        deviceList: this.processDevices(resp['data']['data']),
      },
    };
  }

  //////////////////////////////////////////////////////////////////////////

  processDevices(devices): deviceList[] {
    if (devices == null)
      return []
    const list: deviceList[] = new Array<deviceList>();
    for (let i = 0; i < devices.length; i++) {
      list.push({
        deviceID: devices[i]['id']['id'],
        isGateway: devices[i]['additionalInfo']['gateway'],
        deviceName: devices[i]['name'],
        humanName: devices[i]['label'],
        profile: devices[i]['id']['entityType'],
      });
    }
    return list;
  }

  //////////////////////////////////////////////////////////////////////////

  /* ToDo configure to allow a profile to also be added from the last parameter */
  async createDevice(
    hardwareID: string,
    labelName: string,
    isGateway: boolean,
    profileType?: profileList,
    extraParams?: any
  ): Promise<deviceResponse> {

    const url = this.ThingsBoardURL + '/device';

    let deviceType = 'animalSensor';
    if (isGateway) deviceType = 'gateway';

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const resp = await lastValueFrom(
      this.httpService.post(
        url,
        {
          name: hardwareID,
          type: deviceType,
          label: labelName,
          additionalInfo: { gateway: isGateway },
        },
        { headers: headersReq }
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
      data: resp['data'],
    };
  }

  //////////////////////////////////////////////////////////////////////////

  async assignDevicetoCustomer(
    custID: string,
    deviceID: string
  ): Promise<deviceResponse> {
    const url =
      this.ThingsBoardURL + '/customer/' + custID + '/device/' + deviceID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const resp = await lastValueFrom(
      this.httpService.post(
        url,
        {
          customerId: '',
          deviceId: '',
        },
        { headers: headersReq }
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
      data: resp.data,
    };
  }

  //////////////////////////////////////////////////////////////////////////
  async deleteDevice(deviceID: string): Promise<deviceResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const url = this.ThingsBoardURL + '/device/' + deviceID;

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

  //////////////////////////////////////////////////////////////////////////
  async removeDeviceFromCustomer(deviceID: string): Promise<deviceResponse> {
    const url = this.ThingsBoardURL + '/customer/device/' + deviceID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

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
      data: resp.data,
    };
  }

  //////////////////////////////////////////////////////////////////////////
  async getDeviceInfo(deviceID: string): Promise<deviceResponse> {
    const url = this.ThingsBoardURL + '/device/' + deviceID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
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

  //////////////////////////////////////////////////////////////////////////
  async setGatewayLocation(
    deviceID: string,
    locationParamters: { latitude: number; longitude: number }
  ): Promise<deviceResponse> {
    const url =
      this.ThingsBoardURL +
      '/plugins/telemetry/DEVICE/' +
      deviceID +
      '/attributes/SERVER_SCOPE';

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const resp = await lastValueFrom(
      this.httpService.post(
        url,
        {
          location: locationParamters,
        },
        { headers: headersReq }
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

  //////////////////////////////////////////////////////////////////////////
  async GetGatewayLocation(deviceID: string): Promise<deviceResponse> {

    const url =
      this.ThingsBoardURL +
      '/plugins/telemetry/DEVICE/' +
      deviceID +
      '/values/attributes?keys=location';

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
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
    // console.log('resp :>> ', resp.data[0]?.value);
    return {
      status: resp.status,
      explanation: 'ok',
      data: resp.data[0]?.value,
      setOrExpired: resp.data.setOrExpired,
    };
  }

  /////////////////////////////////////////////////////////////////////////////

  async GetAccessToken(deviceID: string): Promise<deviceResponse> {
    const url = this.ThingsBoardURL + '/device/' + deviceID + '/credentials';

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
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
      data: resp.data
    };
  }

  /////////////////////////////////////////////////////////////////////////////

  async GetTenantDevices(): Promise<deviceResponses> {
    const url = this.ThingsBoardURL + '/tenant/devices?page=0&pageSize=1000';

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
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
      data: resp.data
    };
  }

}

//////////////////////////////////////////////////////////////////////////

export class deviceList {
  deviceID: string;
  isGateway: boolean;
  deviceName: string;
  humanName: string;
  profile: string;
}

export class profileList {
  profileID: string;
  profileName: string;
}

export interface deviceParameters {
  hardwareID: string;
  labelName: string;
  isGateway: boolean;
  profileType?: profileList;
  extraParams?: any;
}

export interface deviceResponse {
  status: number;
  explanation: string;
  data?: {
    deviceList?: deviceList[];
    id?: {
      id?: string;
      entityType?: string;
    };
    createdTime?: number;
    tenantId?: {
      id?: string;
      entityType?: string;
    };
    customerId?: {
      id?: string;
      entityType?: string;
    };
    name?: string;
    type?: string;
    label?: string;
    deviceProfileId?: {
      id?: string;
      entityType?: string;
    };
    deviceData?: {
      configuration?: any;
      transportConfiguration?: any;
    };
    firmwareId?: {
      id?: string;
      entityType?: string;
    };
    softwareId?: {
      id?: string;
      entityType?: string;
    };
    additionalInfo?: any;
    credentialsType?: string;
    credentialsId?: string;
    credentialsValue?: string;
  };
  setOrExpired?: boolean;
}

export interface deviceResponses {
  status: number;
  explanation: string;
  data?: {
    data: {
      deviceList?: deviceList[];
      id?: {
        id?: string;
        entityType?: string;
      };
      createdTime?: number;
      tenantId?: {
        id?: string;
        entityType?: string;
      };
      customerId?: {
        id?: string;
        entityType?: string;
      };
      name?: string;
      type?: string;
      label?: string;
      deviceProfileId?: {
        id?: string;
        entityType?: string;
      };
      deviceData?: {
        configuration?: any;
        transportConfiguration?: any;
      };
      firmwareId?: {
        id?: string;
        entityType?: string;
      };
      softwareId?: {
        id?: string;
        entityType?: string;
      };
      additionalInfo?: any;
      credentialsType?: string;
      credentialsId?: string;
      credentialsValue?: string;
    }[]
  };
  setOrExpired?: boolean;
}
