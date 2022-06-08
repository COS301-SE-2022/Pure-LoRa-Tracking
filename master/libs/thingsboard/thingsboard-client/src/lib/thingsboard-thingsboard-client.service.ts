import { Injectable, NotImplementedException } from '@nestjs/common';
import { ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import {
  deviceList,
  deviceParameters,
  ThingsboardThingsboardDeviceService,
} from '@lora/thingsboard-device';
import { ThingsboardThingsboardAssetService } from '@lora/thingsboard-asset';
import {
  MapApiReserveResponse,
  MapApiHistoricalResponse,
} from '@master/shared-interfaces';
import { userInfo } from 'os';
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

  //////////////////////////////////////////////////////////

  async loginUser(username: string, password: string): Promise<boolean> {
    const resp = await this.loginService.login(username, password);
    if (resp['data']['token'] != undefined) {
      this.token = resp['data']['token'];
      this.refreshToken = resp['data']['RefreshToken'];
      return true;
    }
    return false;
  }

  //////////////////////////////////////////////////////////

  async getCustomerDevices(custID?: string): Promise<deviceList[]> {
    this.deviceService.setToken(this.token);

    let InfoResp = '';
    if (custID == undefined) {
      InfoResp = await this.loginService.userInfo(this.token);
      InfoResp = ['data']['customerId']['id'];
    } else {
      InfoResp = custID;
    }

    const DeviceResp = await this.deviceService.getCustomerDevices(
      0,
      100,
      InfoResp
    );
    return DeviceResp;
  }

  //////////////////////////////////////////////////////////

  setToken(token: string) {
    this.token = token;
  }

  //////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////

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
    if (verifyDevice == undefined || verifyDevice == null) {
      return {
        status: 'fail',
        explanation: 'device with ID not found for user token combination',
        name: DeviceID,
        data: [],
      };
    }

    this.telemetryService.setToken(this.token);
    const resp = await this.telemetryService.getTelemetry(
      DeviceID,
      'DEVICE',
      startTime,
      endTime
    );

    const labelName = verifyDevice['label'];

    return {
      status: 'ok',
      name: DeviceID,
      explanation: labelName,
      data: resp,
    };
  }

  ////////////////////////////////////////////////

  async getAllDevicesHistoricalData() {
    return null;
  }

  ////////////////////////////////////////////////

  async validateToken(): Promise<boolean> {
    if (this.token == '') {
      return false;
    }

    const resp = await this.userService.userInfo(this.token);
    if (resp['status'] == 401) return false;
    else return true;
  }

  /////////////////////////////////////////////////////////

  async validateDevice(deviceID: string): Promise<any> {
    this.deviceService.setToken(this.token);
    const resp = await this.deviceService.getDeviceInfo(deviceID);
    return resp['data'];
  }

  ///////////////////////////////////////////////////////////

  /*
    check token
    if admin use admin call else customer call
    get devices
    filter 
    return
  */
  async getDeviceInfos(filter?: string[]): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    if (Login == false)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    const UserInfo = await this.userService.getUserID(this.token);
    if (UserInfo.code != 200)
      return {
        status: 'fail',
        explanation: 'user type unknown',
      };
    let devices = [];
    if (UserInfo.type == 'admin') {
      /* todo */
      // Tentatively added this for testing.
      devices = await this.getCustomerDevices(UserInfo.id);
    } else {
      devices = await this.getCustomerDevices(UserInfo.id);
    }

    const data = new Array<deviceList>();
    if (filter != undefined) {
      devices.forEach((device: deviceList) => {
        filter.forEach((filterDevice) => {
          if (device.deviceID == filterDevice) data.push(device);
        });
      });
      return {
        status: 'ok',
        explanation: 'call finished',
        data: data,
      };
    } else
      return {
        status: 'ok',
        explanation: 'call finished',
        data: devices,
      };
  }

  ///////////////////////////////////////////////////////////////////////
  /*
    get token
    check admin token
    check userID exists
    create device
    assign device
  */
  async addDeviceToReserve(
    userID: string,
    deviceDetails: deviceParameters
  ): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    if (!Login)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    const UserInfo = await this.userService.getUserID(this.token);
    if (UserInfo.type != 'admin') {
      return {
        status: 'fail',
        explanation: 'wrong permissions',
      };
    }

    const CustInfo = await this.userService.userInfoByCustID(
      this.token,
      userID
    );
    if (CustInfo.status != 200) {
      return {
        status: 'fail',
        explanation: 'customer ID failed with ' + CustInfo.status,
      };
    }

    this.deviceService.setToken(this.token);

    const deviceCreate = await this.deviceService.createDevice(
      deviceDetails.hardwareID,
      deviceDetails.labelName,
      deviceDetails.isGateway,
      deviceDetails.profileType,
      deviceDetails.extraParams
    );
    if (deviceCreate.includes('fail'))
      return {
        status: 'fail',
        explanation: 'device creation failed with: ' + deviceCreate,
      };

    const assignDevice = await this.deviceService.assignDevicetoCustomer(
      userID,
      deviceCreate
    );
    if (assignDevice == false) {
      this.deviceService.deleteDevice(deviceCreate);
      return {
        status: 'fail',
        explanation: 'assign failed, device creation reversed',
      };
    }

    const AccessToken = await this.deviceService.GetAccessToken(deviceCreate);

    return {
      status: 'ok',
      data: deviceCreate,
      explanation : AccessToken.token
    };
  }

  ///////////////////////////////////////////////////////////////////////
  /*
    get token
    check admin token
    delete device
  */
  async RemoveDeviceFromReserve(
    deviceID: string
  ): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    if (!Login)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    const UserInfo = await this.userService.getUserID(this.token);
    if (UserInfo.type != 'admin') {
      return {
        status: 'fail',
        explanation: 'wrong permissions',
      };
    }

    this.deviceService.setToken(this.token);
    const Delete = await this.deviceService.deleteDevice(deviceID);
    if (Delete)
      return {
        status: 'ok',
        explanation: 'call finished',
      };
    else
      return {
        status: 'fail',
        explanation: 'device deletion failed',
      };
  }

  ///////////////////////////////////////////////////////////////////////
  /*
    check token
    check admin
    add user
  */
  async addUserToReserve(
    custID: string,
    email: string,
    firstName: string,
    lastName: string
  ): Promise<thingsboardResponse> {
    const login = await this.userService.getUserID(this.token);

    if (login.code != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.type != 'admin')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };

    const resp = await this.userService.createReserveUser(
      this.token,
      custID,
      email,
      'CUSTOMER_USER',
      firstName,
      lastName
    );

    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation,
      };

    return {
      status: 'ok',
      explanation: resp.explanation,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  /*
    check token
    check admin
    delete user
  */
  async removeReserveUser(userID: string): Promise<thingsboardResponse> {
    const login = await this.userService.getUserID(this.token);
    if (login.code != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.type != 'admin')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };
    const resp = await this.userService.deleteUser(this.token, userID);
    if (resp)
      return {
        status: 'ok',
        explanation: 'call finished',
      };
    else
      return {
        status: 'fail',
        explanation: 'delete failed',
      };
  }

  ///////////////////////////////////////////////////////////////////////
  /*
    check token
    check admin
    disable user
  */
  async disableUser(userID: string): Promise<thingsboardResponse> {
    const login = await this.userService.getUserID(this.token);
    if (login.code != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.type != 'admin')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };

    const resp = await this.userService.DisableUser(this.token, userID);

    if (resp)
      return {
        status: 'ok',
        explanation: 'call finished',
      };
    else
      return {
        status: 'fail',
        explanation: 'disable failed',
      };
  }

  ///////////////////////////////////////////////////////////////////////
  /*
    check token
    check admin
    disable user
  */
  async enableUser(userID: string): Promise<thingsboardResponse> {
    const login = await this.userService.getUserID(this.token);
    if (login.code != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.type != 'admin')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };

    const resp = await this.userService.EnableUser(this.token, userID);

    if (resp)
      return {
        status: 'ok',
        explanation: 'call finished',
      };
    else
      return {
        status: 'fail',
        explanation: 'enable failed',
      };
  }

  ///////////////////////////////////////////////////////////////////////

  async getUserInfoFromToken(): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    if (!Login) return { status: 'fail', explanation: 'token invalid' };
    const resp = await this.userService.userInfo(this.token);
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: 'call failed',
      };
    return {
      status: 'ok',
      explanation: 'call finished',
      data: resp['data'],
    };
  }

  ///////////////////////////////////////////////////////////////////////

  async v1SendTelemetry(
    accessToken: string,
    data: any
  ): Promise<{ status: number; explanation: string }> {
    const resp = await this.telemetryService.V1sendJsonTelemetry(
      accessToken,
      data
    );
    if (resp == 401)
      return {
        status: resp,
        explanation: 'access token invalid',
      };
    return {
      status: 200,
      explanation: 'call finished',
    };
  }

  ///////////////////////////////////////////////////////////////////////

  async getGatewayLocation(deviceID: string): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    const Device = await this.validateDevice(deviceID);

    if (!Login)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };
    if (Device == undefined)
      return {
        status: 'fail',
        explanation: 'device not found',
      };

    const resp = await this.deviceService.GetGatewayLocation(deviceID);
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: 'call failed',
      };

    let data = '';
    resp.data.forEach((element) => {
      if (element.key == 'location') data = element.value[0];
    });

    return {
      status: 'ok',
      explanation: 'call finished',
      data: data,
    };
  }

  ///////////////////////////////////////////////////////////////////////

  async setGatewayLocation(
    deviceID: string,
    locationData: { latitude: number; longitude: number }[]
  ): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    const Device = await this.validateDevice(deviceID);

    if (!Login)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };
    if (Device == undefined)
      return {
        status: 'fail',
        explanation: 'device not found',
      };

    const resp = await this.deviceService.setGatewayLocation(
      deviceID,
      locationData
    );

    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.status.toString(),
      };

    return {
      status: 'ok',
      explanation: 'call finished',
    };
  }

  ///////////////////////////////////////////////////////////////////////
  async AdminGetCustomers() : Promise<thingsboardResponse> {
    const login = await this.userService.getUserID(this.token);
    if (login.code != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.type != 'admin')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };

    const resp = await this.userService.AdminGetCustomers(this.token);
    if(resp.status!=200)
    return {
      status: 'fail',
      explanation: resp.status.toString(),
    }; 

    return {
      status:"ok",
      explanation:"call finished",
      data:resp.data.data
    }
    

  }

}

/* data is required to be any due to the many possible response data types */
export interface thingsboardResponse {
  status: string;
  explanation?: string;
  name?: string;
  data?: any;
}
