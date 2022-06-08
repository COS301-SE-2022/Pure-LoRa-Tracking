import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import {
  AddGatewayDevice,
  AddSensorDevice,
  deviceInfos,
  deviceResponse,
  RemoveDevice,
} from './../api-device.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiDeviceEndpointService {
  constructor(private thingsboardClient: ThingsboardThingsboardClientService) {}

  async processDeviceInfos(body: deviceInfos): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    this.thingsboardClient.setToken(body.token);

    const resp = await this.thingsboardClient.getDeviceInfos(body.deviceIDs);

    if (resp.status == 'fail')
      return {
        status: 400,
        explanation: resp.explanation,
      };

    return {
      status: 200,
      explanation: 'ok',
      data: resp.data,
    };
  } 

  async processDeviceAddsensor(body: AddSensorDevice): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    if (body.customerID == undefined)
      return {
        status: 400,
        explanation: 'no customer ID found',
      };

    if (body.hardwareName == undefined)
      return {
        status: 400,
        explanation: 'no hardware name found',
      };

    if (body.labelName == undefined)
      return {
        status: 400,
        explanation: 'no label name found',
      };

    this.thingsboardClient.setToken(body.token);
    const resp = await this.thingsboardClient.addDeviceToReserve(
      body.customerID,
      {
        hardwareID: body.hardwareName,
        isGateway: false,
        labelName: body.labelName,
        extraParams: body.extraParams,
        profileType: body.profileType,
      }
    );

    if (resp.status == 'fail')
      return {
        status: 400,
        explanation: resp.explanation,
      };

    return {
      status: 200,
      explanation: 'ok',
      data : resp.data
    };
  }

  async processDeviceAddGateway(
    body: AddGatewayDevice
  ): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    if (body.customerID == undefined)
      return {
        status: 400,
        explanation: 'no customer ID found',
      };

    if (body.hardwareName == undefined)
      return {
        status: 400,
        explanation: 'no hardware name found',
      };

    if (body.labelName == undefined)
      return {
        status: 400,
        explanation: 'no label name found',
      };

    this.thingsboardClient.setToken(body.token);
    const resp = await this.thingsboardClient.addDeviceToReserve(
      body.customerID,
      {
        hardwareID: body.hardwareName,
        isGateway: true,
        labelName: body.labelName,
        extraParams: body.extraParams,
        profileType: body.profileType,
      }
    );

    if (resp.status == 'fail')
      return {
        status: 400,
        explanation: resp.explanation,
      };

    return {
      status: 200,
      explanation: 'ok',
      data : resp.data
    };
  }

  async processDeviceremove(body: RemoveDevice): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    if (body.deviceID == undefined)
      return {
        status: 400,
        explanation: 'no device ID found',
      };

    this.thingsboardClient.setToken(body.token);

    const resp = await this.thingsboardClient.RemoveDeviceFromReserve(body.deviceID);
    if (resp.status == 'fail')
      return {
        status: 400,
        explanation: resp.explanation,
      };

    return {
      status: 200,
      explanation: 'ok',
      data : resp.data
    };
  }
}
