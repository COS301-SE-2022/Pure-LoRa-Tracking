import { Injectable } from '@nestjs/common';

import * as grpc from '@grpc/grpc-js';

import { InternalServiceClient } from '@chirpstack/chirpstack-api/as/external/api/internal_grpc_pb';
import * as internalMessages from '@chirpstack/chirpstack-api/as/external/api/internal_pb';

import { DeviceServiceClient } from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';
import * as deviceMessages from '@chirpstack/chirpstack-api/as/external/api/device_pb';

import { DeviceProfileServiceClient } from '@chirpstack/chirpstack-api/as/external/api/deviceProfile_grpc_pb';
import { ListDeviceProfileRequest,GetDeviceProfileRequest } from '@chirpstack/chirpstack-api/as/external/api/deviceProfile_pb';
import { } from '@chirpstack/chirpstack-api/ns/ns_pb'
import { DeviceProfile } from '@chirpstack/chirpstack-api/as/external/api/profiles_pb';

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

  async listDevices(
    authtoken: string
  ): Promise<deviceMessages.ListDeviceResponse> {
    this.metadata.set('authorization', 'Bearer ' + authtoken);

    const listDeviceRequest = new deviceMessages.ListDeviceRequest();
    listDeviceRequest.setLimit(1000);
    listDeviceRequest.setApplicationId(1);

    return new Promise((res, rej) => {
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

  async getProfileDetail(
    authtoken: string,
    profileId: string
  ): Promise<DeviceProfile> {
    this.metadata.set('authorization', 'Bearer ' + authtoken);

    const getDeviceProfileRequest = new GetDeviceProfileRequest();
    getDeviceProfileRequest.setId(profileId);

    return new Promise((res, rej) => {
      this.deviceProfileServiceClient.get(
        getDeviceProfileRequest,
        this.metadata,
        (error, data) => {
          if (data) res(data.getDeviceProfile());
          else rej(error);
        }
      );
    });
  }

  async getProfiles(authtoken: string): Promise<DeviceProfile[]> {
    this.metadata.set('authorization', 'Bearer ' + authtoken);

    const listDeviceProfileRequest = new ListDeviceProfileRequest();
    listDeviceProfileRequest.setLimit(1000);
    listDeviceProfileRequest.setApplicationId(1);

    return new Promise((res, rej) => {
      this.deviceProfileServiceClient.list(
        listDeviceProfileRequest,
        this.metadata,
        async (error, data) => {
          if (data) {
            const list = [];
            for (const item of data.getResultList()) {
              list.push(await this.getProfileDetail(authtoken, item.getId()));
            }
            
            res(list);
          } else rej(error);
        }
      );
    });
  }

  async addDevice(
    authtoken: string,
    thingsBoardDeviceToken: string,
    devName: string,
    devEUI: string,
    deviceProfileId: string,
    deviceDesc = 'General device',
    deviceAppl = 1
  ) {
    this.metadata.set('authorization', 'Bearer ' + authtoken);

    const createDeviceRequest = new deviceMessages.CreateDeviceRequest();
    const device = new deviceMessages.Device();
    device.setName(devName);
    device.setDevEui(devEUI);
    device.setDescription(deviceDesc);
    device.setDeviceProfileId(deviceProfileId);
    device.setApplicationId(deviceAppl);
    // set thingsBoardDeviceToken as a variable on the chirpstack "device" to identify it when data is received
    const deviceVariables = device.getVariablesMap();
    deviceVariables.set('ThingsBoardAccessToken', thingsBoardDeviceToken);
    createDeviceRequest.setDevice(device);

    return new Promise((res, rej) => {
      this.deviceServiceClient.create(
        createDeviceRequest,
        this.metadata,
        (error, data) => {
          if (data) res(data);
          else rej(error);
        }
      );
    });
  }

  async removeDevice(authtoken: string, devEUI: string) {
    this.metadata.set('authorization', 'Bearer ' + authtoken);

    const deleteDeviceRequest = new deviceMessages.DeleteDeviceRequest();
    deleteDeviceRequest.setDevEui(devEUI);

    return new Promise((res, rej) => {
      this.deviceServiceClient.delete(
        deleteDeviceRequest,
        this.metadata,
        (error, data) => {
          if (data) res(data);
          else rej(error);
        }
      );
    });
  }
}
