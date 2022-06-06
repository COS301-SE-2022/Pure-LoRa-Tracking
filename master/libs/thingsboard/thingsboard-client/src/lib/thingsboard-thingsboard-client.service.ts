import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardDeviceService } from '@lora/thingsboard-device';
import { ThingsboardThingsboardAssetService } from '@lora/thingsboard-asset';
import {
  MapApiReserveResponse,
  MapApiHistoricalResponse,
} from '@master/shared-interfaces';
@Injectable()
export class ThingsboardThingsboardClientService {
  private token: string;
  private refreshToken: string;

  constructor(
    private userService: ThingsboardThingsboardUserService,
    private telemetryService: ThingsboardThingsboardTelemetryService,
    private loginService: ThingsboardThingsboardUserService,
    private deviceService: ThingsboardThingsboardDeviceService,
    private assetService: ThingsboardThingsboardAssetService
  ) {}

  async loginUser(username: string, password: string): Promise<boolean> {
    const resp = await this.loginService.login(username, password);
    if (resp['data']['token'] != undefined) {
      this.token = resp['data']['token'];
      this.refreshToken = resp['data']['RefreshToken'];
      return true;
    }
    return false;
  }

  async getUserDevices(): Promise<any> {
    const InfoResp = await this.loginService.userInfo(this.token);
    this.deviceService.setToken(this.token);
    const DeviceResp = await this.deviceService.getCustomerDevices(
      0,
      5,
      InfoResp['data']['customerId']['id']
    );
    return DeviceResp;
  }

  setToken(token: string) {
    this.token = token;
  }

  /*
        check token
        check customerID
        get asset list
        get, build and return perim
        this may be multiple if admin
    */
  async getReservePerimeter(): Promise<MapApiReserveResponse> {
    if (this.token == undefined)
      return {
        code: 401,
        status: 'failure',
        explanation: 'no access token',
      };

    const userInfo = await this.userService.getUserID(this.token);
    if (userInfo['code'] != undefined) {
      /* fail */
    }

    this.assetService.setToken(this.token);

    let ids = [];
    if (userInfo['type'] == 'user') {
      ids = await this.assetService.getAssetIDs(userInfo['id']);
    } else {
      return null;
    }

    //console.log(ids.length);

    for (let i = 0; i < ids.length; i++) {
      const element = ids[i];
      if (element['type'] == 'Reserve')
        return this.assetService.getReservePerimeter(element['EntityID']);
    }

    return {
      code: 404,
      status: 'not found',
      explanation: 'no reserve set',
    };
  }

  /* 
        check token
        check device

    */
  async getDeviceHistoricalData(
    DeviceID: string,
    startTime?: number,
    endTime?: number
  ): Promise<thingsboardResponse> {
    const verifyToken = await this.validateToken();
    if (verifyToken == false) {
      return {
        status: 'fail',
        explanation: 'token',
      };
    }

    const verifyDevice = await this.validateDevice(DeviceID);
    if (verifyDevice == false) {
      return {
        status: 'fail',
        explanation: 'device with ID not found for user token combination',
        name : DeviceID,
        data : []
      };
    }

    this.telemetryService.setToken(this.token);
    const resp = await this.telemetryService.getTelemetry(
      DeviceID,
      'DEVICE',
      startTime,
      endTime
    );
    return {
      status: 'ok',
      name : DeviceID,
      explanation: 'call finished',
      data: resp,
    };
  }

  async getAllDevicesHistoricalData() {
    return null;
  }

  async validateToken(): Promise<boolean> {
    if (this.token == '') {
      return false;
    }

    const resp = await this.userService.userInfo(this.token);
    if (resp['status'] == 401) return false;
    else return true;
  }

  async validateDevice(deviceID: string): Promise<boolean> {
    this.deviceService.setToken(this.token);
    const resp = await this.deviceService.getDevice(deviceID);
    return resp.status == 200;
  }
}

/* data is required to be any due to the many possible response data types */
export interface thingsboardResponse {
  status: string;
  explanation?: string;
  name? : string,
  data?: any;
}
