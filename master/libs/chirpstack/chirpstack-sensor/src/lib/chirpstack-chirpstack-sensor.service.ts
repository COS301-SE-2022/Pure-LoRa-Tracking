import { Injectable } from '@nestjs/common';

import * as grpc from '@grpc/grpc-js';

import { InternalServiceClient } from '@chirpstack/chirpstack-api/as/external/api/internal_grpc_pb';
import * as internalMessages from '@chirpstack/chirpstack-api/as/external/api/internal_pb';

import { DeviceServiceClient } from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';
import * as deviceMessages from '@chirpstack/chirpstack-api/as/external/api/device_pb';


@Injectable()
export class ChirpstackChirpstackSensorService {
  internalServiceClient: InternalServiceClient;
  deviceServiceClient: DeviceServiceClient;

  constructor() {
    this.internalServiceClient = new InternalServiceClient(
      'localhost:8080',
      grpc.credentials.createInsecure()
    );

    // this.deviceServiceClient = new DeviceServiceClient(
    //   '', null,
    //   //reuse connection channel
    //   { channelOverride: this.internalServiceClient.getChannel() }
    // );
    this.deviceServiceClient = new DeviceServiceClient(
      'localhost:8080',
      grpc.credentials.createInsecure()
    );
  }

  async list_devices(authtoken: string): Promise<deviceMessages.ListDeviceResponse> {
    return new Promise((res, rej) => {
      const metadata2 = new grpc.Metadata();
      metadata2.set('authorization', 'Bearer ' + authtoken);
      const listDeviceRequest = new deviceMessages.ListDeviceRequest();
      listDeviceRequest.setLimit(1000);
      listDeviceRequest.setApplicationId(1);
      this.deviceServiceClient.list(
        listDeviceRequest,
        metadata2,
        (error, data) => {
          if (data) res(data);
          else rej(error);
        }
      );
    });
  }

  
}
