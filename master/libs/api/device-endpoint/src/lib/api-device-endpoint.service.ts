import {
  thingsboardResponse,
  ThingsboardThingsboardClientService,
} from '@lora/thingsboard-client';
import { ChirpstackChirpstackGatewayService } from '@lora/chirpstack-gateway';
import { ChirpstackChirpstackSensorService } from '@lora/chirpstack-sensor';

import {
  AddGatewayDevice,
  AddSensorDevice,
  deviceAssign,
  deviceAvailable,
  deviceInfos,
  deviceResponse,
  GatewayLocationAdd,
  GatewayLocationInfo,
  GetGatewaysInput,
  RemoveDevice,
  UnassignDevice,
} from './../api-device.interface';
import { Injectable } from '@nestjs/common';
import { DeviceProfile } from '@chirpstack/chirpstack-api/as/external/api/profiles_pb';

@Injectable()
export class ApiDeviceEndpointService {
  constructor(
    private thingsboardClient: ThingsboardThingsboardClientService,
    private chirpstackGateway: ChirpstackChirpstackGatewayService,
    private chirpstackSensor: ChirpstackChirpstackSensorService,
  ) { }

  ///////////////////////////////////////////////////////////////////////////

  async processDeviceInfos(body: deviceInfos): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    this.thingsboardClient.setToken(body.token);

    const resp = await this.thingsboardClient.getDeviceInfos(body.deviceIDs, body.customerID);
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
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data.deviceCreate);
      return {
        status: 400,
        explanation: "access token failure"
      }
    }

    const chirpPromise = await this.chirpstackSensor.addDevice(
      process.env.CHIRPSTACK_API,
      resp.data.deviceToken,
      body.labelName,
      body.hardwareName,
      body.deviceProfileId
    ).catch((err) => {
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data.deviceCreate);
      return {
        status: 400,
        explanation: "access token failure"
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
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data.deviceCreate);
      return {
        status: 400,
        explanation: "access token failure"
      }
    }

    await this.chirpstackGateway.addGateway(
      process.env.CHIRPSTACK_API,
      resp.explanation,
      body.labelName,
      body.hardwareName,
    ).catch((_) => {
      this.thingsboardClient.RemoveDeviceFromReserve(resp.data.deviceCreate);
      return {
        status: 400,
        explanation: "access token failure"
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
    // const deviceInfo = await this.thingsboardClient.getDeviceInfos([body.deviceID]);

    const resp = await this.thingsboardClient.RemoveDeviceFromReserve(
      body.deviceID
    );
    if (resp.status == 'fail')
      return {
        status: 400,
        explanation: resp.explanation,
      };

    const isGateway = body.isGateway;
    const devID = body.devEUI;
    if (isGateway) {
      try {
        this.chirpstackGateway.removeGateway(
          process.env.CHIRPSTACK_API,
          devID)
      } catch(Exception) {
        return {
          status: 400,
          explanation: "Failed to remove device"
        }
      };
    } else {
      await this.chirpstackSensor.removeDevice(
        process.env.CHIRPSTACK_API,
        devID
      ).catch((_) => {
        return {
          status: 400,
          explanation: "Failed to remove device"
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
      if (status != 200)
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
    
    this.chirpstackGateway.setGatewayLocation(
      process.env.CHIRPSTACK_API,
      body.devEUI,
      body.locationParameters.latitude,
      body.locationParameters.longitude
    )

    this.thingsboardClient.setToken(body.token);
    const resp = await this.thingsboardClient.setGatewayLocation(body.deviceID, body.locationParameters);
    if (resp.status == "fail" && resp.explanation.includes('token'))
      return {
        status: 401,
        explanation: resp.explanation
      }

    if (resp.status == "fail")
      return {
        status: 400,
        explanation: resp.explanation
      }

    return {
      status: 200,
      explanation: resp.explanation
    }
  }


  ///////////////////////////////////////////////////////////
  async getGatewaysProcess(body: GetGatewaysInput): Promise<deviceResponse> {
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

    this.thingsboardClient.setToken(body.token);
    const response = await this.thingsboardClient.getCustomerDevices(body.customerID);
    console.log(response)
    if (response.status != "ok") {
      return {
        status: 500,
        explanation: response.explanation
      }
    }

    return {
      status: 200,
      explanation: "call finished",
      data: response.data.filter(val => val.isGateway == true)
    }

  }

  ///////////////////////////////////////////////////////////////////////////
  async processGetDeviceProfiles(): Promise<deviceResponse> {

    const result = await this.chirpstackSensor.getProfiles(process.env.CHIRPSTACK_API);
    const resultData = result.map((item) => ({
      id: item.getId(), name: item.getName(), isOTAA: item.getSupportsJoin() , macVerion: item.getMacVersion()
    }));
    return {
      status: 200,
      explanation: "call finished",
      data: resultData
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  async processDeviceRemoveDeviceFromReserve(body: UnassignDevice): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    if (body.deviceID == undefined || body.deviceID == '')
      return {
        status: 400,
        explanation: 'no device ID found',
      };

    this.thingsboardClient.setToken(body.token);
    const response = await this.thingsboardClient.unassignDevice(body.deviceID)
    if (response.status == 'fail') {
      return {
        status: 500,
        explanation: response.explanation
      }
    }

    return {
      status: 200,
      explanation: "call finished",
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  async processDeviceAvailable(body: deviceAvailable): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    this.thingsboardClient.setToken(body.token);
    const response = await this.thingsboardClient.getUnassignedDevicesForAdmin();
    if (response.status == 'fail') {
      return {
        status: 500,
        explanation: response.explanation
      }
    }

    return {
      status: 200,
      explanation: "call finished",
      data: response.data
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  async processDeviceAssign(body: deviceAssign): Promise<deviceResponse> {
    if (body.token == undefined || body.token == '')
      return {
        status: 401,
        explanation: 'no token found',
      };

    if (body.customerID == undefined || body.customerID == '')
      return {
        status: 401,
        explanation: 'no customer ID found',
      };

    if (body.deviceID == undefined || body.deviceID == '')
      return {
        status: 401,
        explanation: 'no device ID found',
      };

      this.thingsboardClient.setToken(body.token);
      const response = await this.thingsboardClient.assignDeviceToReserve(body.customerID, body.deviceID);
      if (response.status == 'fail') {
        return {
          status: 500,
          explanation: response.explanation
        }
      }
  
      return {
        status: 200,
        explanation: "call finished",
      }
  }
}
