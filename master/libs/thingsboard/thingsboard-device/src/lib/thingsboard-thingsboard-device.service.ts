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
    return await lastValueFrom(
      this.httpService.get(url, { headers: headersReq })
    );
  }

  processDevices(devices): deviceList[] {
    const list: deviceList[] = new Array<deviceList>();
    for (let i = 0; i < devices.length; i++) {
      list.push({
        deviceID: devices[i]['id']['id'],
        isGateway: devices[i]['additionalInfo']['gateway'],
        name: devices[i]['name'],
        profile: devices[i]['id']['entityType'],
      });
    }
    return list;
  }

  /* ToDo configure to allow a profile to also be added from the last parameter */
  async createDevice(
    hardwareID: string,
    labelName: string,
    isGateway: boolean,
    profileType?: profileList
  ): Promise<boolean> {
    if (this.token == '') return false;

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
          "name": hardwareID,
          "type": deviceType,
          "label": labelName,
        },
        { headers: headersReq }
      )).catch((error)=> {
        if(error.response == undefined)
          return null;
        if(error.response.status==400) {
          return {status:400}   
        }
      })
    return resp.status == 200;
  }

  async assignDevicetoCustomer(
    custID: string,
    deviceID: string
  ): Promise<boolean> {
    if (this.token == '') return false;
    const url = this.baseURL +
      "customer/" +
      custID +
      "/device/" +
      deviceID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const resp = await lastValueFrom(this.httpService.post(url,
      {
        "customerId": "",
        "deviceId": ""
      },
      { headers: headersReq }
    )).catch((error) => {
      if (error.response == undefined)
        return null;
      if (error.response.status == 400) {
        return { status: 400 }
      }
    });

    return resp.status == 200;
  }

  async getDeviceProfiles() {
    return null;
  }

  processDeviceProfiles(profiles: any): profileList[] {
    return null;
  }

  async deleteDevice(deviceID: string): Promise<boolean> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const url = this.baseURL+"device/"+deviceID;

    const resp = await lastValueFrom(this.httpService.delete(
      url, {headers:headersReq}
    )).catch((error)=> {
      if(error.response == undefined)
        return null;
      if(error.response.status==400) {
        return {status:400}   
      }
    })
  return resp.status == 200;
  }
  
  async removeDeviceFromCustomer(
    deviceID: string
  ): Promise<boolean> {
    if (this.token == '') return false;
    const url = this.baseURL +
      "customer/device/" +
      deviceID;

    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };

    const resp = await lastValueFrom(this.httpService.delete(url, { headers: headersReq })).catch((error) => {
      if (error.response == undefined)
        return null;
      if (error.response.status == 400) {
        return { status: 400 }
      }
    });

    return resp.status == 200;
  }
}

export class deviceList {
  deviceID: string;
  isGateway: boolean;
  name: string;
  profile: string;
}

export class profileList {
  profileID: string;
  profileName: string;
}
