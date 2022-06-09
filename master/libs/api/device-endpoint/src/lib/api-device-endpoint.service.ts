import {
  thingsboardResponse,
  ThingsboardThingsboardClientService,
} from '@lora/thingsboard-client';
import { ChirpstackChirpstackGatewayService } from '@chirpstack/gateway';
import { ChirpstackChirpstackSensorService } from '@chirpstack/sensor';

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
import { DeviceProfile } from '@chirpstack/chirpstack-api/as/external/api/profiles_pb';

@Injectable()
export class ApiDeviceEndpointService {
  constructor(
    private thingsboardClient: ThingsboardThingsboardClientService,
    private chirpstackGateway: ChirpstackChirpstackGatewayService,
    private chirpstackSensor: ChirpstackChirpstackSensorService,
  ) {}

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
    
    if (body.deviceProfileId == undefined)
      return {
        status: 400,
        explanation: 'no device Profile ID name found',
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

    if (resp.explanation == undefined) {
      /* delete the device as we do not want a half install */
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data);
      return {
        status : 400,
        explanation : "access token failure"
      }
    }
    
    const chirpPromise = await this.chirpstackSensor.addDevice(
      process.env.CHIRPSTACK_API,
      resp.explanation,
      body.labelName,
      body.hardwareName,
      body.deviceProfileId
    ).catch((err) => {
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data);
      return {
        status : 400,
        explanation : "access token failure"
      }
    });

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

    if (resp.explanation == undefined) {
      /* delete the device as we do not want a half install */
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data);
      return {
        status : 400,
        explanation : "access token failure"
      }
    }

    await this.chirpstackGateway.addGateway(
      process.env.CHIRPSTACK_API,
      resp.explanation,
      body.labelName,
      body.hardwareName,
    ).catch((_) => {
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data);
      return {
        status : 400,
        explanation : "access token failure"
      }
    });

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

    /* Get ID and whether the device is a gateway or not */
    const deviceInfo = await this.thingsboardClient.getDeviceInfos([body.deviceID]);

    const resp = await this.thingsboardClient.RemoveDeviceFromReserve(
      body.deviceID
    );
    if (resp.status == 'fail')
      return {
        status: 400,
        explanation: resp.explanation,
      };

    const isGateway = deviceInfo['data'][0]["isGateway"];
    const devID = deviceInfo['data'][0]["deviceName"];
    if (isGateway) {
      await this.chirpstackGateway.removeGateway(
        process.env.CHIRPSTACK_API,
        devID
      ).catch((_) => {
        return {
          status : 400,
          explanation : "Failed to remove device"
        }
      });
    } else {
      await this.chirpstackSensor.removeDevice(
        process.env.CHIRPSTACK_API,
        devID
      ).catch((_) => {
        return {
          status : 400,
          explanation : "Failed to remove device"
        }
      });
    }
  
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

  ///////////////////////////////////////////////////////////////////////////
  // TODO: Implement endpoint
  async processGetDeviceProfiles(): Promise<deviceResponse> {
    return {
      status : 200,
      explanation : "call finished",
      data : this.chirpstackSensor.getProfiles(process.env.CHIRPSTACK_API)
    }
  }

}
