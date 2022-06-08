import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardDeviceService {
  private token: string;
  private baseURL = 'http://localhost:8080/api/';
  constructor(private httpService: HttpService) {
    this.token = '';
  }

  setToken(token: string): void {
    this.token = token;
  }

  async getCustomerDevices(page: number, pageSize: number, customerID: string) {
    if (this.token == '') return null;

    const url =
      this.baseURL +
      'customer/' +
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
    );
    return this.processDevices(resp['data']['data']);
  }

  //////////////////////////////////////////////////////////////////////////

  processDevices(devices): deviceList[] {
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
  ): Promise<string> {
    if (this.token == '') return 'token-fail';

    const url = this.baseURL + 'device';

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
        },
        { headers: headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });
    if (resp.status != 200) return 'fail-server';
    else return resp['data']['id']['id'];
  }

  //////////////////////////////////////////////////////////////////////////

  async assignDevicetoCustomer(
    custID: string,
    deviceID: string
  ): Promise<boolean> {
    if (this.token == '') return false;
    const url = this.baseURL + 'customer/' + custID + '/device/' + deviceID;

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
      if (error.response == undefined) return null;
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });

    return resp.status == 200;
  }

  //////////////////////////////////////////////////////////////////////////
  async getDeviceProfiles() {
    return null;
  }

  //////////////////////////////////////////////////////////////////////////
  processDeviceProfiles(profiles: any): profileList[] {
    return null;
  }

  //////////////////////////////////////////////////////////////////////////
  async deleteDevice(deviceID: string): Promise<boolean> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const url = this.baseURL + 'device/' + deviceID;

    const resp = await lastValueFrom(
      this.httpService.delete(url, { headers: headersReq })
    ).catch((error) => {
      if (error.response == undefined) return null;
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });
    return resp.status == 200;
  }

  //////////////////////////////////////////////////////////////////////////
  async removeDeviceFromCustomer(deviceID: string): Promise<boolean> {
    if (this.token == '') return false;
    const url = this.baseURL + 'customer/device/' + deviceID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const resp = await lastValueFrom(
      this.httpService.delete(url, { headers: headersReq })
    ).catch((error) => {
      if (error.response == undefined) return null;
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });

    return resp.status == 200;
  }

  //////////////////////////////////////////////////////////////////////////
  async getDeviceInfo(deviceID: string) {
    if (this.token == '') return null;

    const url = this.baseURL + 'device/' + deviceID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
    ).catch((error) => {
      if (error.response == undefined) return null;
      return { status: error.response.status };
    });
  }

  //////////////////////////////////////////////////////////////////////////
  async setGatewayLocation(
    deviceID: string,
    locationParamters: { latitude: number; longitude: number }[]
  ): Promise<{ status: number }> {
    if (this.token == '') return {
      status : 401
    };

    const url = this.baseURL + 'plugins/telemetry/DEVICE/'+deviceID+'/attributes/SERVER_SCOPE';

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const resp = await lastValueFrom(
      this.httpService.post(
        url,
        {
          location : locationParamters
        },
        { headers: headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      if (error.response.status == 400) {
        return { status: 400 };
      }
    });

    return resp;
    
  }

  //////////////////////////////////////////////////////////////////////////
  async GetGatewayLocation(
    deviceID: string
  ): Promise<any> {
    if (this.token == '') return null;

    const url =
      this.baseURL + "plugins/telemetry/DEVICE/"+deviceID+"/values/attributes?keys=location"

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
    ).catch((error) => {
      if (error.response == undefined) return null;
      return {status : error.response.status}
    });

    return {
      status : resp.status,
      data : resp['data']
    };
  }

  //////////////////////////////////////////////////////////////////////////
  async GetAccessToken(
    deviceID: string
  ): Promise<{token:string, explain?:string}> {
    if (this.token == '') return null;

    const url =
      this.baseURL + "device/"+deviceID+"/credentials"

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    const resp = await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
    ).catch((error) => {
      if (error.response == undefined) return null;
      return {status : error.response.status}
    });

    if(resp.status != 200)
    return {token:"", explain:resp.status}

    return {token:resp['data']['credentialsId']}

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
