import { Injectable } from '@nestjs/common';

import * as grpc from '@grpc/grpc-js';

import { InternalServiceClient } from '@chirpstack/chirpstack-api/as/external/api/internal_grpc_pb';
import * as internalMessages from '@chirpstack/chirpstack-api/as/external/api/internal_pb';

import { DeviceServiceClient } from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';
import * as deviceMessages from '@chirpstack/chirpstack-api/as/external/api/device_pb';

import { DeviceProfileServiceClient } from '@chirpstack/chirpstack-api/as/external/api/deviceProfile_grpc_pb';
import { ListDeviceProfileRequest,DeviceProfileListItem } from '@chirpstack/chirpstack-api/as/external/api/deviceProfile_pb';


@Injectable()
export class ChirpstackChirpstackSensorService {
  internalServiceClient: InternalServiceClient;
  deviceServiceClient: DeviceServiceClient;
  deviceProfileServiceClient: DeviceProfileServiceClient;
  metadata: grpc.Metadata;

  constructor() {
    this.internalServiceClient = new InternalServiceClient(
      'localhost:8080',
      grpc.credentials.createInsecure()
    );

    this.deviceProfileServiceClient = new DeviceProfileServiceClient(
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

    this.metadata = new grpc.Metadata();
  }

  async list_devices(
    authtoken: string
  ): Promise<deviceMessages.ListDeviceResponse> {
    return new Promise((res, rej) => {
      this.metadata.set('authorization', 'Bearer ' + authtoken);
      const listDeviceRequest = new deviceMessages.ListDeviceRequest();
      listDeviceRequest.setLimit(1000);
      listDeviceRequest.setApplicationId(1);
      this.deviceServiceClient.list(
        listDeviceRequest,
        this.metadata,
        (error, data) => {
          if (data) res(data);
          else rej(error);
        }
      );
    });
  }

  async get_profiles(authtoken: string): Promise<Record<string, string>> {
    return new Promise((res, rej) => {
      this.metadata.set('authorization', 'Bearer ' + authtoken);
      const listDeviceProfileRequest = new ListDeviceProfileRequest();
      listDeviceProfileRequest.setLimit(1000);
      listDeviceProfileRequest.setApplicationId(1);
      this.deviceProfileServiceClient.list(
        listDeviceProfileRequest,
        this.metadata,
        (error, data) => {
          if (data) {
            const list = {};
            for (const item of data.getResultList()) {
              list[item.getId()] = item.getName();
            }
            // res(data.getResultList());
            res(list);
          } else rej(error);
        }
      );
    });
  }

}
