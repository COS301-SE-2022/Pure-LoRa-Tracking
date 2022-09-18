import { Injectable } from '@nestjs/common';
import { ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTelemetryService } from '@lora/thingsboard-telemetry';
import {
  deviceList,
  deviceParameters,
  ThingsboardThingsboardDeviceService,
} from '@lora/thingsboard-device';
import { ThingsboardThingsboardAssetService } from '@lora/thingsboard-asset';
import { MapApiReserveResponse } from '@master/shared-interfaces';
import { ThingsboardThingsboardAdminService } from '@lora/thingsboard/admin';
import { ThingsboardThingsboardReserveService } from '@lora/thingsboard/reserve';
import { ServiceBusService } from '@lora/serviceBus';
@Injectable()
export class ThingsboardThingsboardClientService {
  private token: string;
  private refreshToken: string;

  constructor(
    private userService: ThingsboardThingsboardUserService,
    private telemetryService: ThingsboardThingsboardTelemetryService,
    private loginService: ThingsboardThingsboardUserService,
    private deviceService: ThingsboardThingsboardDeviceService,
    private assetService: ThingsboardThingsboardAssetService,
    private adminService: ThingsboardThingsboardAdminService,
    private reserveService: ThingsboardThingsboardReserveService,
    private serviceBus: ServiceBusService
  ) { }

  //////////////////////////////////////////////////////////

  async loginUser(username: string, password: string): Promise<boolean> {
    const resp = await this.loginService.login(username, password);
    if (resp.status == 200) {
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
        status: 'ok',
        Token: this.token,
        refreshToken: this.refreshToken,
      };
    }
    return {
      status: 'fail',
      explanation: resp.explanation,
      Token: '',
      refreshToken: '',
    };
  }

  //////////////////////////////////////////////////////////

  async loginFromRefreshToken(
    refreshToken: string
  ): Promise<thingsboardResponse> {
    const resp = await this.loginService.refreshToken(refreshToken);
    if (resp.status != 200) {
      return {
        status: 'fail',
        explanation: resp.explanation,
      };
    }
    if (resp.data.token != undefined) {
      this.token = resp.data.token;
      this.refreshToken = resp.data.refreshToken;
      return {
        status: 'ok',
        explanation: 'ok',
        data: {
          token: this.token,
          refreshToken: this.refreshToken,
        },
      };
    }
    return {
      status: 'fail',
      explanation: 'Something went wrong',
    };
  }

  //////////////////////////////////////////////////////////

  /* internal to this client and to not to be used externally */
  async getToken(username: string, password: string) {
    return await this.userService.login(username, password);
  }

  //////////////////////////////////////////////////////////

  getPrivateToken(): string {
    return this.token;
  }

  //////////////////////////////////////////////////////////

  async logout(token: string): Promise<thingsboardResponse> {
    const logout = await this.userService.logout(token);
    if (logout.status != 200)
      return {
        status: 'fail',
        explanation: logout.explanation,
      };
    else
      return {
        status: 'ok',
      };
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

    //console.table(deviceResp);

    if (deviceResp.status != 200) {
      return {
        status: 'fail',
        explanation: deviceResp.explanation,
        data: [],
      };
    }

    return {
      status: 'ok',
      explanation: deviceResp.explanation,
      data: deviceResp.data.deviceList,
    };
  }

  //////////////////////////////////////////////////////////

  setToken(token: string) {
    this.token = token;
  }

  //////////////////////////////////////////////////////////

  /*
  check permission
  check group exists
  create group
  add location if exists
  */
  async createReserve(
    email: string,
    name: string,
    location?: {
      features: {
        type: string;
        properties: any;
        geometry: {
          type: string;
          coordinates: [number, number][][];
        };
      }[];
    }
  ): Promise<thingsboardResponse> {
    if (this.token == undefined)
      return {
        status: 'fail',
        explanation: 'no access token',
      };

    const user = await this.userService.userInfo(this.token);
    if (user.status != 200)
      return {
        status: 'fail',
        explanation: user.explanation,
      };
    if (
      user.data.authority == undefined ||
      user.data.authority == 'CUSTOMER_USER'
    )
      return {
        status: 'fail',
        explanation: 'user is not an admin',
      };

    this.reserveService.setToken(this.token);
    const response = await this.reserveService.createReserveGroup(
      email,
      name,
      location
    );
    this.generateReserveList_ReserveAdmin();
    if (response.status != 200)
      return {
        status: 'fail',
        explanation: response.explanation,
      };
    return {
      status: 'ok',
      explanation: 'call finished',
    };
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
    const userInfo = await this.userService.userInfo(this.token);
    if (userInfo.status != 200)
      return {
        status: 'fail',
        code: 400,
        explanation: userInfo.explanation,
      };

    const reserve = await this.CustomerInfo(userInfo.data.customerId.id)
    //console.log('reserve :>> ', reserve);
    if (reserve.status == 'fail')
      return {
        code: 500,
        status: 'fail',
        explanation: reserve.explanation
      }


    if (reserve.data.additionalInfo.location == undefined)
      return {
        code: 404,
        status: 'fail',
        explanation: 'no reserve set',
      };

    return {
      code: 200,
      status: 'ok',
      explanation: 'call finished',
      data: {
        "reserveName": reserve.data.name,
        "location": reserve.data.additionalInfo.location
      }
    }
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

    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation,
      };

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
    if (resp.status == 200) {
      return {
        status: 'ok',
        explanation: 'call finished',
        token: resp.data.token,
        refreshToken: resp.data.refreshToken,
      };
    } else
      return {
        status: 'fail',
        explanation: resp.explanation,
        token: '',
        refreshToken: '',
      };
  }

  ////////////////////////////////////////////////

  async validateToken(): Promise<boolean> {
    if (this.token == '') {
      return false;
    }

    const resp = await this.userService.userInfo(this.token);
    if (resp.status != 200) return false;
    else return true;
  }

  /////////////////////////////////////////////////
  async validateTokenParam(token: string): Promise<boolean> {
    if (token == '') {
      return false;
    }

    const resp = await this.userService.userInfo(token);
    //console.log(resp);
    if (resp['status'] != 200) return false;
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
  async getDeviceInfos(
    filter = [],
    AdminCustomerID?: string
  ): Promise<thingsboardResponse> {
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
        furtherExplain: UserInfo.explanation,
      };
    let devices: thingsboardResponse;
    if (UserInfo.data.authority == 'TENANT_ADMIN') {
      if (AdminCustomerID == undefined)
        return {
          status: 'fail',
          explanation: 'an Admin requires a reserve ID',
        };
      devices = await this.getCustomerDevices(AdminCustomerID);
    } else {
      devices = await this.getCustomerDevices(UserInfo.data.customerId.id);
    }

    const data = new Array<deviceList>();
    if (filter.length > 0 && filter != undefined) {
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
    }
    return {
      status: 'ok',
      explanation: 'call finished',
      data: devices.data,
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
    ReserveID: string,
    deviceDetails: deviceParameters
  ): Promise<thingsboardResponse> {
    const Login = await this.validateToken();
    if (!Login)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    const UserInfo = await this.userService.userInfo(this.token);
    if (UserInfo.status != 200) {
      return {
        status: 'fail',
        explanation: UserInfo.explanation,
      };
    }

    if (UserInfo.data.authority != 'TENANT_ADMIN') {
      return {
        status: 'fail',
        explanation: 'wrong permissions',
      };
    }

    this.reserveService.setToken(this.token);
    const CustInfo = await this.reserveService.CustomerInfo(ReserveID);
    if (CustInfo.status != 200) {
      return {
        status: 'fail',
        explanation: 'customer ID failed with ' + CustInfo.status,
        furtherExplain: CustInfo.explanation,
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
      ReserveID,
      deviceCreate.data.id.id
    );
    if (assignDevice.status != 200) {
      /* TODO check reverse passes? */
      this.deviceService.deleteDevice(deviceCreate.data.id.id);
      return {
        status: 'fail',
        explanation: 'assign failed, device creation reversed',
      };
    }

    const AccessToken = await this.deviceService.GetAccessToken(
      deviceCreate.data.id.id
    );

    if (deviceDetails.isGateway == false) {
      const mongoPair = { location: CustInfo.data.additionalInfo.location, device: AccessToken.data.credentialsId, name: CustInfo.data.title };
      this.serviceBus.sendMongoDevicePerimeter(mongoPair);
    }


    return {
      status: 'ok',
      data: { 
        deviceCreate: deviceCreate,
        deviceToken: AccessToken.data.credentialsId 
      },
      explanation: AccessToken.explanation,
      furtherExplain: AccessToken.data.credentialsId
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
    if (UserInfo.status != 200)
      return {
        status: 'fail',
        explanation: UserInfo.explanation,
      };

    if (UserInfo.data.authority != 'TENANT_ADMIN') {
      return {
        status: 'fail',
        explanation: 'wrong permissions',
      };
    }

    this.deviceService.setToken(this.token);
    const Delete = await this.deviceService.deleteDevice(deviceID);
    if (Delete.status == 200)
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
    reserves: { reserveName: string; reserveID: string }[]
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
    TODO server does change on behalf
  */
  async changeReserveForUser(custID: string): Promise<thingsboardResponse> {
    const UserInfo = await this.userService.userInfo(this.token);
    if (UserInfo.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
        furtherExplain: UserInfo.explanation,
      };

    let exists = false;
    for (
      let i = 0;
      i < UserInfo.data.additionalInfo.reserves.length && exists == false;
      i++
    ) {
      const element = UserInfo.data.additionalInfo.reserves[i];
      if (element.reserveID == custID) exists = true;
    }

    if (UserInfo.data.additionalInfo.reserves == undefined || exists == false)
      return {
        status: 'fail',
        explanation: 'user not in reserve',
      };

    const resp = await this.userService.changeReserveForUser(
      this.token,
      UserInfo.data.tenantId.id,
      UserInfo.data.id.id,
      custID,
      UserInfo.data.email,
      UserInfo.data.firstName,
      UserInfo.data.lastName,
      UserInfo.data.additionalInfo.reserves
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
    check user is admin
    get user info
    move user
  */
  async changeReservesAvailableforUser(
    userID: string,
    reserves: { reserveName: string; reserveID: string }[]
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

    const UserInfo = await this.userService.userInfoByUserID(
      this.token,
      userID
    );

    if (UserInfo.status != 200)
      return {
        status: 'fail',
        explanation: 'user is not available',
        furtherExplain: UserInfo.explanation,
      };

    const resp = await this.userService.changeReserveForUser(
      this.token,
      UserInfo.data.tenantId.id,
      UserInfo.data.id.id,
      UserInfo.data.customerId.id,
      UserInfo.data.email,
      UserInfo.data.firstName,
      UserInfo.data.lastName,
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
    if (resp.status == 200)
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

    if (resp.status == 200)
      return {
        status: 'ok',
        explanation: 'call finished',
      };
    else
      return {
        status: 'fail',
        explanation: 'disable failed',
        furtherExplain: resp.explanation,
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

    if (resp.status == 200)
      return {
        status: 'ok',
        explanation: 'call finished',
      };
    else
      return {
        status: 'fail',
        explanation: 'enable failed',
        furtherExplain: resp.explanation,
      };
  }

  ///////////////////////////////////////////////////////////////////////

  async getUserInfoFromToken(): Promise<thingsboardResponse> {
    const resp = await this.userService.userInfo(this.token);
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation,
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
    if (resp != 200)
      return {
        status: resp,
        explanation: 'send telemetry failed',
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

    //const data = '';
    //TODO return lat longs
    // resp.data.deviceList.forEach((element) => {
    //   if (element.key == 'location') data = element.value[0];
    // });

    return {
      status: 'ok',
      explanation: 'call finished',
      data: resp.data,
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

  /////////////////////////////////////////////////////////////////

  /*
  check admin
  */
  async updateReservePerimeter(
    reserveID: string,
    location: {
      features: {
        type: string;
        properties: any;
        geometry: {
          type: string;
          coordinates: [number, number][][];
        };
      }[];
    }
  ): Promise<thingsboardResponse> {
    const user = await this.userService.userInfo(this.token);

    if (user.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (user.data.authority != 'TENANT_ADMIN')
      return {
        status: 'fail',
        explanation: 'wrong permissions',
      };

    this.reserveService.setToken(this.token);
    const info = await this.reserveService.CustomerInfo(reserveID);

    if (info.status != 200)
      return {
        status: 'fail',
        explanation: info.explanation,
      };

    if (info.data.additionalInfo.location != undefined)
      delete info.data.additionalInfo.location;

    const response = await this.reserveService.setReservePerimeter(
      info.data.externalId?.id,
      info.data.id.id,
      info.data.title,
      info.data.region,
      info.data.tenantId.id,
      info.data.country,
      info.data.city,
      info.data.address,
      info.data.address2,
      info.data.zip,
      info.data.phone,
      info.data.email,
      Object.assign(info.data.additionalInfo, { location: location })
    );

    if (response.status != 200)
      return {
        status: 'fail',
        explanation: response.explanation,
      };

    const mongoPair = { name: info.data.title, location: location };
    this.serviceBus.sendMongoDevicePerimeter(mongoPair);

    return {
      status: 'ok',
      explanation: 'call finished',
    };
  }

  /////////////////////////////////////////////////////////////////
  /*
    check sysadmin
    get tenants
    get customers
    build list 
  */
  async generateReserveList_SystemAdmin(): Promise<thingsboardResponse> {
    const login = await this.userService.userInfo(this.token);
    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'SYS_ADMIN')
      return {
        status: 'fail',
        explanation: 'user not system admin',
      };

    this.adminService.setToken(this.token);
    const tenants = await this.adminService.getTenantInfos(1000, 0);

    if (tenants.status != 200) {
      return {
        status: 'fail',
        explanation: 'tenant info',
        furtherExplain: tenants.explanation,
      };
    }

    const reserveList = new Array<{
      tenantID: string;
      reserveID: string;
      reserveName: string;
    }>();

    console.log(tenants)
    tenants.data.forEach((tenant) => {
      tenant.additionalInfo.reserves.forEach((reserve) => {
        reserveList.push({
          tenantID: tenant.id.id,
          reserveID: reserve.reserveID,
          reserveName: reserve.reserveName,
        });
      });
    });

    if (login.data.additionalInfo.reserves != null)
      delete login.data.additionalInfo.reserves;

    const resp = await this.userService.UpdateUserInfo(
      this.token,
      login.data.id.id,
      login.data.tenantId.id,
      login.data.customerId.id,
      login.data.email,
      login.data.authority,
      login.data.firstName,
      login.data.lastName,
      Object.assign(login.data.additionalInfo, { reserves: reserveList })
    );

    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation,
      };

    return {
      status: 'ok',
      explanation: 'call finished',
    };
  }

  /////////////////////////////////////////////////////////////////
  /*
    get and check tenant account
    get customers
    build list 
    update tenant account
  */
  async generateReserveList_ReserveAdmin(): Promise<thingsboardResponse> {
    const login = await this.userService.userInfo(this.token);
    if (login.status != 200)
      return {
        status: 'fail',
        explanation: 'token invalid',
      };

    if (login.data.authority != 'TENANT_ADMIN')
      return {
        status: 'fail',
        explanation: 'user not reserve admin',
      };

    this.adminService.setToken(this.token);
    const reserves = await this.adminService.getCustomersOfTenant(1000, 0);

    if (reserves.status != 200) {
      return {
        status: 'fail',
        explanation: reserves.explanation,
      };
    }

    const reserveList = new Array<{ reserveID: string; reserveName: string }>();

    reserves.data.forEach((item) => {
      reserveList.push({
        reserveID: item.id.id,
        reserveName: item.name,
      });
    });

    const TenantGroup = await this.adminService.getTenantGroupInfo(
      login.data.tenantId.id
    );

    if (TenantGroup.status != 200)
      return {
        status: 'fail',
        explanation: 'tenant group fail',
        furtherExplain: TenantGroup.explanation,
      };

    const sysadmin = await this.getToken(
      'server@thingsboard.org',
      'thingsboardserveraccountissecure'
    );

    if (sysadmin.status != 200)
      return {
        status: 'fail',
        explanation: 'server token fail',
        furtherExplain: TenantGroup.explanation,
      };

    this.adminService.setToken(sysadmin.data.token);

    if (TenantGroup.data.additionalInfo.reserves != undefined)
      delete TenantGroup.data.additionalInfo.reserves;

    const resp = await this.adminService.updateTenant(
      TenantGroup.data.id.id,
      TenantGroup.data.title,
      TenantGroup.data.region,
      TenantGroup.data.tenantProfileId.id,
      TenantGroup.data.country,
      TenantGroup.data.city,
      TenantGroup.data.address,
      TenantGroup.data.address2,
      TenantGroup.data.zip,
      TenantGroup.data.phone,
      TenantGroup.data.phone,
      Object.assign(TenantGroup.data.additionalInfo, { reserves: reserveList })
    );

    this.userService.logout(sysadmin.data.token);

    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation,
      };

    return {
      status: 'ok',
      explanation: 'call finished',
    };
  }
  /////////////////////////////////////////////////////////////////

  /* TODO check the user is an admin or higher */
  async CustomerInfo(reserveID: string): Promise<thingsboardResponse> {
    this.reserveService.setToken(this.token);
    const resp = await this.reserveService.CustomerInfo(reserveID);
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation,
      };
    return {
      status: 'ok',
      explanation: 'call finished',
      data: resp.data,
    };
  }

  /////////////////////////////////////////////////////////////////
  async removeReserve(reserveID: string): Promise<thingsboardResponse> {
    this.reserveService.setToken(this.token);
    const resp = await this.reserveService.deleteReserveGroup(reserveID);
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation,
      };
    this.generateReserveList_ReserveAdmin()
    return {
      status: 'ok',
      explanation: 'call finished',
    };
  }

  /////////////////////////////////////////////////////////////////
  async getReserveList(): Promise<thingsboardResponse> {
    const userInfo = await this.getUserInfoFromToken();
    if (userInfo.status == 'fail')
      return {
        status: 'fail',
        explanation: userInfo.explanation,
      };

    if (userInfo.data.authority == 'CUSTOMER_USER')
      return {
        status: 'fail',
        explanation: 'request not made by an admin',
      };

    const serverLogin = await this.loginUser(
      'server@thingsboard.org',
      process.env.DEFAULT_SERVER_PASSWORD
    );

    if (serverLogin == false)
      return {
        status: 'fail',
        explanation: 'server fail',
      };

    await this.generateReserveList_SystemAdmin()
    const serverUser = await this.userService.userInfo(this.token);

    if (serverUser.status != 200)
      return {
        status: 'fail',
        explanation: serverUser.explanation,
      };

    return {
      status: 'ok',
      explanation: 'call finished',
      data: serverUser.data.additionalInfo.reserves,
    };
  }

  /////////////////////////////////////////////////////////////////
  async updateReserveInfo(reserveID: string, details: {
    NameOfReserve: string,
    region?: string,
    country?: string,
    city?: string,
    address?: string,
    address2?: string,
    zip?: string,
    phone?: string,
    email?: string,
  }) {
    const user = await this.userService.userInfo(this.token);

    if (user.status != 200)
      return {
        status: 'fail',
        explanation: 'token fail',
        furtherExplain: user.explanation
      };

    if (user.data.authority != 'TENANT_ADMIN')
      return {
        status: 'fail',
        explanation: 'wrong permissions',
        furtherExplain: user.explanation
      };

    this.reserveService.setToken(this.token);
    const info = await this.reserveService.CustomerInfo(reserveID);

    if (info.status != 200)
      return {
        status: 'fail',
        explanation: 'reserve info',
        furtherExplain: info.explanation
      };

    const response = await this.reserveService.setReservePerimeter(
      info.data.externalId?.id,
      info.data.id.id,
      details.NameOfReserve,
      details.region,
      info.data.tenantId.id,
      info.data.country,
      info.data.city,
      info.data.address,
      info.data.address2,
      info.data.zip,
      info.data.phone,
      details.email,
      info.data.additionalInfo
    );

    if (response.status != 200)
      return {
        status: 'fail',
        explanation: 'reserve update',
        furtherExplain: response.explanation,
      };

    this.serviceBus.sendMongoDevicePerimeter({ name: info.data.title, newName: details.NameOfReserve })

    return {
      status: 'ok',
      explanation: 'call finished',
    };
  }

  ////////////////////////////////////////////////////////////////

  async updateUser(userID: string, details: {
    firstName: string,
    lastName: string,
  }, reserves?: { reserveName: string, reserveID: string }[]): Promise<thingsboardResponse> {
    const user = await this.userService.userInfo(this.token);

    if (user.status != 200)
      return {
        status: 'fail',
        explanation: 'token',
        furtherExplain: user.explanation
      };

    const userinfo = await this.userService.userInfoByUserID(this.token, userID);
    if (userinfo.status != 200)
      return {
        status: 'fail',
        explanation: 'user to update',
        furtherExplain: userinfo.explanation
      }

    const additionalinfo = userinfo.data.additionalInfo;
    if (reserves != undefined) {
      delete additionalinfo.reserves
      additionalinfo.reserves = reserves
    }

    const resp = await this.userService.UpdateUserInfo(this.token,
      userID,
      userinfo.data.tenantId.id,
      userinfo.data.customerId.id,
      userinfo.data.email, userinfo.data.authority,
      details.firstName,
      details.lastName,
      additionalinfo);

    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: 'update',
        furtherExplain: resp.explanation
      }

    return {
      status: 'ok',
      explanation: 'call finished'
    }
  }

  ////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////
  async unassignDevice(deviceID: string): Promise<thingsboardResponse> {
    const userInfo = await this.getUserInfoFromToken();
    if (userInfo.status == 'fail')
      return {
        status: 'fail',
        explanation: 'token',
        furtherExplain: userInfo.explanation
      }

    if (userInfo.data.authority != "TENANT_ADMIN")
      return {
        status: 'fail',
        explanation: "not admin",
        furtherExplain: userInfo.explanation
      }

    this.deviceService.setToken(this.token);
    const response = await this.deviceService.removeDeviceFromCustomer(deviceID);

    if (response.status != 200)
      return {
        status: 'fail',
        explanation: 'unassign',
        furtherExplain: response.explanation
      }

    return {
      status: 'ok',
      explanation: "call finished"
    }
  }

  ////////////////////////////////////////////////////////////////
  async getUnassignedDevicesForAdmin(): Promise<thingsboardResponse> {
    const userInfo = await this.getUserInfoFromToken();
    if (userInfo.status == 'fail')
      return {
        status: 'fail',
        explanation: 'user',
        furtherExplain: userInfo.explanation
      }

    if (userInfo.data.authority != "TENANT_ADMIN")
      return {
        status: 'fail',
        explanation: "not admin",
        furtherExplain: userInfo.explanation
      }

    const response = await this.deviceService.GetTenantDevices();

    if (response.status != 200)
      return {
        status: 'fail',
        explanation: 'get',
        furtherExplain: response.explanation
      }

    const retArray = new Array<any>();
    for (let i = 0; i < response.data.data.length; i++) {
      if (response.data.data[i].customerId.id == '13814000-1dd2-11b2-8080-808080808080')
        retArray.push({
          deviceID: response.data.data[i].id.id,
          deviceName: response.data.data[i].name,
          isGateway: response.data.data[i].additionalInfo.gateway
        })
    }

    return {
      status: 'ok',
      explanation: 'call finished',
      data: retArray
    }
  }

  ////////////////////////////////////////////////////////////////
  async assignDeviceToReserve(reserveID: string, deviceID: string): Promise<thingsboardResponse> {
    const userInfo = await this.getUserInfoFromToken();
    if (userInfo.status == 'fail')
      return {
        status: 'fail',
        explanation: userInfo.explanation
      }

    if (userInfo.data.authority != "TENANT_ADMIN")
      return {
        status: 'fail',
        explanation: "not admin"
      }

    const resp = await this.deviceService.assignDevicetoCustomer(reserveID, deviceID);

    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation
      }

    this.telemetryService.clearTelemetry(resp.data.id.id);
    this.reserveService.setToken(this.token);
    const CustInfo = await this.reserveService.CustomerInfo(reserveID);
    this.deviceService.setToken(this.token);
    const AccessToken = await this.deviceService.GetAccessToken(deviceID);
    const mongoPair = { device: AccessToken.data.credentialsId, name: CustInfo.data.title };
    this.serviceBus.sendMongoDevicePerimeter(mongoPair);

    return {
      status: 'ok',
      explanation: 'call finished'
    }
  }

  ////////////////////////////////////////////////////////////////
  async getUserInfoByID(userID: string): Promise<thingsboardResponse> {
    const resp = await this.userService.userInfoByUserID(this.token, userID);
    if (resp.status != 200)
      return {
        status: 'fail',
        explanation: resp.explanation
      }

    return {
      status: 'ok',
      explanation: 'call finished',
      data: resp.data
    }
  }
}

/* data is required to be any due to the many possible response data types */

export interface thingsboardResponse {
  status: 'ok' | 'fail';
  explanation?: string;
  furtherExplain?: string;
  name?: string;
  data?: any;
}

export interface thingsboardLoginResponse {
  status: 'ok' | 'fail';
  explanation?: string;
  furtherExplain?: string;
  Token: string;
  refreshToken: string;
}

export interface refreshResponse {
  status: 'ok' | 'fail';
  explanation: string;
  token: string;
  refreshToken: string;
}
