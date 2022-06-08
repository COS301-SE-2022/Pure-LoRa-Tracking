import {
  thingsboardResponse,
  ThingsboardThingsboardClientService,
} from '@lora/thingsboard-client';
import {
  AddGatewayDevice,
  AddSensorDevice,
  deviceInfos,
  deviceResponse,
  GatewayLocationAdd,
  GatewayLocationInfo,
  RemoveDevice,
} from './../api-device.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiDeviceEndpointService {
  constructor(private thingsboardClient: ThingsboardThingsboardClientService) {}

  ///////////////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////

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
      data: resp.data,
    };
  }

  ///////////////////////////////////////////////////////////////////////////

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
      data: resp.data,
    };
  }

  ///////////////////////////////////////////////////////////////////////////

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

    const resp = await this.thingsboardClient.RemoveDeviceFromReserve(
      body.deviceID
    );
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

  ///////////////////////////////////////////////////////////////////////////

  async processGatewayGetLocationInfo(
    body: GatewayLocationInfo
  ): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    if (body.deviceIDs == undefined)
      return {
        status: 400,
        explanation: 'no device IDs found',
      };

    this.thingsboardClient.setToken(body.token);

    const AwaitResponses = new Array<{
      data: Promise<thingsboardResponse>;
      deviceID: string;
    }>();

    body.deviceIDs.forEach((deviceID) => {
      AwaitResponses.push({
        data: this.thingsboardClient.getGatewayLocation(deviceID),
        deviceID: deviceID,
      });
    });

    const Responses = new Array<{
      data: thingsboardResponse;
      deviceID: string;
    }>();

    for (let i = 0; i < AwaitResponses.length; i++) {
      const element = await AwaitResponses[i].data;
      Responses.push({
        data: element,
        deviceID: AwaitResponses[i].deviceID,
      });
    }

    let explain = 'ok';
    let status = 200;

    const data = new Array<{
      deviceID: string;
      location?: any;
      explain?: string;
    }>();
    Responses.forEach((response) => {
      if(status != 200)
      return;
      if (
        response.data.status == 'fail' &&
        response.data.explanation.includes('token')
      ) {
        explain = response.data.explanation;
        status = 401;
      }
      if (response.data.status == 'fail') {
        data.push({
          deviceID: response.deviceID,
          explain: response.data.explanation,
        });
        explain = 'some devices had errors';
      } else {
        data.push({
          deviceID: response.deviceID,
          location: response.data.data,
        });
      }
    });

    return {
      status: status,
      explanation: explain,
      data: data,
    };
  }

  ///////////////////////////////////////////////////////////////////////////

  async processGatewaySetLocation(
    body: GatewayLocationAdd
  ): Promise<deviceResponse> {
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

      if (body.locationParameters == undefined)
      return {
        status: 400,
        explanation: 'no location parameters',
      };

  this.thingsboardClient.setToken(body.token);
  const resp = await this.thingsboardClient.setGatewayLocation(body.deviceID, body.locationParameters);
  if(resp.status == "fail" && resp.explanation.includes('token'))
  return {
    status : 401,
    explanation : resp.explanation    
  }

  if(resp.status == "fail")
  return {
    status : 400,
    explanation : resp.explanation    
  }

  return {
    status: 200,
    explanation : resp.explanation
  }

  
  }
}
