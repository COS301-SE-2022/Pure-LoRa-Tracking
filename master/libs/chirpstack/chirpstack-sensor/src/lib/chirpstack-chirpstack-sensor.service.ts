import { Injectable } from '@nestjs/common';

import * as grpc from '@grpc/grpc-js';

import * as internalService from '@chirpstack/chirpstack-api/as/external/api/internal_grpc_pb';
import * as internalMessages from '@chirpstack/chirpstack-api/as/external/api/internal_pb';

import * as deviceService from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';
import * as deviceMessages from '@chirpstack/chirpstack-api/as/external/api/device_pb';

@Injectable()
export class ChirpstackChirpstackSensorService {
  internalServiceClient: internalService.InternalServiceClient;
  deviceServiceClient: deviceService.DeviceServiceClient;

  constructor() {
    //  private deviceServiceClient: deviceService.DeviceServiceClient, // private listDeviceRequest: deviceMessages.ListDeviceRequest, // private metadata: Metadata
    
    // this.deviceServiceClient = new deviceService.DeviceServiceClient(
    //   'localhost:8080',
    //   grpc.credentials.createInsecure()
    // )
    // const metadata = new grpc.Metadata();
    // metadata.set('authorization', response.getJwt());
    // const test = new deviceMessages.ListDeviceRequest();
    // const test2 = new deviceService.DeviceServiceClient(
    //   'localhost:8080',
    //   grpc.credentials.createInsecure()
    // );
    // metadata.set(
    //   'authorization',
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiODkzM2I2OGYtZjkxZS00ZTkyLTkyNWEtN2FkMmIyOThkOTAzIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1MzgzMzY4Miwic3ViIjoiYXBpX2tleSJ9.Bl7DICLslwpsFyF71ybKbvb2iar9IUA9cFpHN3rXFO0'
    // );
    this.internalServiceClient = new internalService.InternalServiceClient(
      'localhost:8080',
      grpc.credentials.createInsecure()
    );

    this.deviceServiceClient = new deviceService.DeviceServiceClient(
      'localhost:8080',
      grpc.credentials.createInsecure()
    );
  }

  

}










