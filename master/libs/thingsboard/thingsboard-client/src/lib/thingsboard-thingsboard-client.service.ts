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
  ) { }

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

  ///////////////////////////////////////////////////////////

  async loginUserReturnToken(
    username: string,
    password: string
  ): Promise<thingsboardLoginResponse> {
    const resp = await this.loginService.login(username, password);
    if (resp.status == 200) {
      this.token = resp.data.token;
      this.refreshToken = resp.data.refreshToken;
      return { 
        status : "ok",
        Token: this.token, 
        refreshToken: this.refreshToken 
      };
    }
    return { 
      status : "fail",
      explanation : resp.explanation,
      Token: '', 
      refreshToken: '' 
    };
  }

  //////////////////////////////////////////////////////////

  async loginFromRefreshToken(refreshToken: string): Promise<thingsboardResponse> {
    const resp = await this.loginService.refreshToken(refreshToken);
    if (resp.status != 200) {
      return {
        status: "fail",
        explanation: resp.explanation
      }
    }
    if (resp.data.token != undefined) {
      this.token = resp.data.token;
      this.refreshToken = resp.data.refreshToken;
      return {
        status: "ok",
        explanation: "ok",
        data: {
          token: this.token,
          refreshToken: this.refreshToken
        }
      };
    }
    return {
      status: "fail",
      explanation: "Something went wrong"
    };
  }

  //////////////////////////////////////////////////////////

  async logout(token: string) : Promise<thingsboardResponse> {
    const logout = await this.userService.logout(token);
    if(logout.status != 200)
      return {
        status : "fail",
        explanation : logout.explanation
      }
    else return {
      status : "ok"
    }
  }


  //////////////////////////////////////////////////////////
  /*
    An admin wanting to see the customer's devices
    should have the customer ID from another call
  */

  async getCustomerDevices(custID: string): Promise<thingsboardResponse> {
    this.deviceService.setToken(this.token);

    const deviceResp = await this.deviceService.getCustomerDevices(
      0,
      100,
      custID
    );

    if (deviceResp.status == 401) {
      return {
        status: "fail",
        explanation: deviceResp.explanation,
      }
    }

    console.table(deviceResp)

    if (deviceResp.status != 200) {
      return {
        status: "fail",
        explanation: deviceResp.explanation,
        data: []
      }
    }

    return {
      status: "ok",
      explanation: deviceResp.explanation,
      data: deviceResp.data.deviceList
    }
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
    const val = await this.validateToken();
    if (val == false) {
      return {
        code: 401,
        status: 'failure',
        explanation: 'Invalid access token',
      };
    }

    const userInfo = await this.userService.userInfo(this.token);
    if (userInfo['code'] != undefined || userInfo.status != 200) {
      return {
        code: 500,
        status: 'failure',
        explanation: 'user information unavailable',
      };
    }

    this.assetService.setToken(this.token);

    const response = (await this.assetService.getAssetIDs(userInfo.data.customerId.id));
    if (response.status != 200) {
      return {
        code: 401,
        status: 'Authentication Failure',
        explanation: 'Username/Password/Token Invalid',
      }
    }

    
    const ids = response.data.assets;
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

  /////////////////////////////////////////////////////////

  async validateDevice(deviceID: string): Promise<any> {
    this.deviceService.setToken(this.token);
    const resp = await this.deviceService.getDeviceInfo(deviceID);
    return resp['data'];
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
    const deviceName = verifyDevice['name'];

    return {
      status: 'ok',
      name: DeviceID,
      explanation: labelName,
      furtherExplain: deviceName,
      data: resp,
    };
  }

  ////////////////////////////////////////////////
  async refresh(token: string): Promise<refreshResponse> {
    const resp = await this.userService.refreshToken(token);
    if (resp.status == 200 && resp.explanation == "ok") {
      return {
        status: "ok",
        token: resp.data.token,
        refreshToken: resp.data.refreshToken
      }
    }
    //maybe extend it later to show more errors
    return {
      status: "fail",
      token: "",
      refreshToken: ""
    }
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

  /////////////////////////////////////////////////
  async validateTokenParam(token: string): Promise<boolean> {
    if (this.token == '') {
      return false;
    }

    const resp = await this.userService.userInfo(token);
    //console.log(resp);
    if (resp['status'] == 401) return false;
    else return true;
  }
  ///////////////////////////////////////////////////////////

  /*
    check token
    if admin use admin call else customer call
    get devices
    filter 
    return
  */
  async getDeviceInfos(filter?: string[], AdminCustomerID? : string): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    if (Login == false)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    const UserInfo = await this.userService.userInfo(this.token);
    if (UserInfo.status != 200)
      return {
        status: 'fail',
        explanation: 'user type unknown',
      };
    let devices: thingsboardResponse;
    if (UserInfo.data.authority == 'TENANT_ADMIN') {
      if(AdminCustomerID == undefined)
        return {
          status: 'fail',
          explanation: 'an Admin requires a reserve ID',
        };
      devices = await this.getCustomerDevices(AdminCustomerID);
    } else {
      devices = await this.getCustomerDevices(UserInfo.data.customerId.id);
    }

    const data = new Array<deviceList>();
    if (filter != undefined) {
      //TODO check if i am looping over the correct thing
      devices.data.forEach((device: deviceList) => {
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

    const UserInfo = await this.userService.userInfo(this.token);
    if (UserInfo.data.authority != 'TENANT_ADMIN') {
      return {
        status: 'fail',
        explanation: 'wrong permissions',
      };
    }

    const CustInfo = await this.userService.CustomerInfo(
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

    if (deviceCreate.status != 200)
      return {
        status: 'fail',
        explanation: 'device creation failed with: ' + deviceCreate.explanation,
      };

    const assignDevice = await this.deviceService.assignDevicetoCustomer(
      userID,
      deviceCreate.data.id.id
    );
    if (assignDevice.status != 200) {
      this.deviceService.deleteDevice(deviceCreate.data.id.id);
      return {
        status: 'fail',
        explanation: 'assign failed, device creation reversed',
      };
    }

    const AccessToken = await this.deviceService.GetAccessToken(deviceCreate.data.id.id);

    return {
      status: 'ok',
      data: deviceCreate,
      explanation: AccessToken.explanation,
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

    const UserInfo = await this.userService.userInfo(this.token);
    if (UserInfo.data.authority != 'TENANT_ADMIN') {
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
    lastName: string,
    reserves : string[]
  ): Promise<thingsboardResponse> {
    const login = await this.userService.userInfo(this.token);

    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'TENANT_ADMIN')
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
      lastName,
      reserves
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
    check user is in reserve
    get user info
    move user
  */
  async changeReserveForUser(
    custID: string
  ): Promise<thingsboardResponse> {
    const login = await this.userService.userInfo(this.token);

    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    const UserInfo = await this.userService.userInfo(this.token);

    if(UserInfo.data.additionalInfo.reserves == undefined || UserInfo.data.additionalInfo.reserves.includes(custID)==false)
    return {
      status: 'fail',
      explanation: 'user not in reserve',
    };

    if (UserInfo.status != 200)
      return {
        status: 'fail',
        explanation: UserInfo.explanation,
      };

    const resp = await this.userService.changeReserveForUser(this.token, UserInfo.data.tenantId.id, UserInfo.data.id.id, custID, UserInfo.data.email, UserInfo.data.firstName, UserInfo.data.lastName, UserInfo.data.additionalInfo.reserves);

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
    check user is admin
    get user info
    move user
  */
    async changeReservesAvailableforUser(
      userID : string,
      reserves : string[]
    ): Promise<thingsboardResponse> {
      const login = await this.userService.userInfo(this.token);
  
      if (login.status != 200)
        return {
          status: 'fail',
          explanation: 'token invalid',
        };

        if (login.data.authority != 'TENANT_ADMIN')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };
        
  
      const UserInfo = await this.userService.userInfoByUserID(this.token, userID);
  
      if (UserInfo.status != 200)
        return {
          status: 'fail',
          explanation: UserInfo.explanation,
        };
  
      const resp = await this.userService.changeReserveForUser(this.token, UserInfo.data.tenantId.id, UserInfo.data.id.id, UserInfo.data.customerId.id, UserInfo.data.email, UserInfo.data.firstName, UserInfo.data.lastName, reserves);
  
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
    const login = await this.userService.userInfo(this.token);
    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'TENANT_ADMIN')
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
    const login = await this.userService.userInfo(this.token);
    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'TENANT_ADMIN')
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
    const login = await this.userService.userInfo(this.token);
    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'TENANT_ADMIN')
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

    const data = '';
    //TODO return lat longs
    // resp.data.deviceList.forEach((element) => {
    //   if (element.key == 'location') data = element.value[0];
    // });

    return {
      status: 'ok',
      explanation: 'call finished',
      data: data,
    };
  }

  ///////////////////////////////////////////////////////////////////////

  async setGatewayLocation(
    deviceID: string,
    locationData: { latitude: number; longitude: number }
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
  async AdminGetCustomers(): Promise<thingsboardResponse> {
    const login = await this.userService.userInfo(this.token);
    //console.log(login);
    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'TENANT_ADMIN')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };

    const resp = await this.userService.AdminGetCustomers(this.token);
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.status.toString(),
      };

    return {
      status: 'ok',
      explanation: 'call finished',
      data: resp.data,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  async AdminGetUsersFromReserve(customerID: string) {

    const login = await this.userService.userInfo(this.token);
    //console.log(login);
    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'TENANT_ADMIN')
      return {
        status: 'fail',
        explanation: 'user not admin',
      };

    const resp = await this.userService.GetUsersFromReserve(
      this.token,
      customerID
    );
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.status.toString(),
      };

    return {
      status: 'ok',
      explanation: 'call finished',
      data: resp.data,
    };
  }
}

/* data is required to be any due to the many possible response data types */


export interface thingsboardResponse {
  status: string;
  explanation?: string;
  furtherExplain?: string;
  name?: string;
  data?: any;
}

export interface thingsboardLoginResponse {
  status: string;
  explanation?: string;
  furtherExplain?: string;
  Token : string;
  refreshToken : string;
}

export interface refreshResponse {
  "status": "ok" | "fail";
  "token": string;
  "refreshToken": string
}