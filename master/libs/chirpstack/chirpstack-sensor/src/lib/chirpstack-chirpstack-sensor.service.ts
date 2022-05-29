import { Injectable } from '@nestjs/common';

import * as grpc from '@grpc/grpc-js';

import * as internalService from '@chirpstack/chirpstack-api/as/external/api/internal_grpc_pb';
import * as internalMessages from '@chirpstack/chirpstack-api/as/external/api/internal_pb';

import * as deviceService from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';
import * as deviceMessages from '@chirpstack/chirpstack-api/as/external/api/device_pb';


// const internalServiceClient = new internalService.InternalServiceClient(
//   'localhost:8080',
//   grpc.credentials.createInsecure()
// );
// const loginRequest = new internalMessages.LoginRequest();

// loginRequest.setEmail('admin');
// loginRequest.setPassword('admin');    

// internalServiceClient.login(loginRequest, (error, response) => {
//   // Build a gRPC metadata object, setting the authorization key to the JWT we
//   // got back from logging in.
//   const metadata = new grpc.Metadata();
//   // metadata.set('authorization', response.getJwt());
//   metadata.set(
//     'authorization',
//     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiODkzM2I2OGYtZjkxZS00ZTkyLTkyNWEtN2FkMmIyOThkOTAzIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1MzgzMzY4Miwic3ViIjoiYXBpX2tleSJ9.Bl7DICLslwpsFyF71ybKbvb2iar9IUA9cFpHN3rXFO0'
//   );


//   const test = new deviceMessages.ListDeviceRequest();
  
//   const test2 = new deviceService.DeviceServiceClient(
//     'localhost:8080',
//     grpc.credentials.createInsecure()
//   );
//   // test2.create()

//   test2.list(test, metadata, (error, response) => {
//     console.log(response.toArray())
//   });

//   // This metadata can now be passed for requests to APIs that require authorization
//   // e.g.
//   // const deb_req = new deviceMessages.CreateDeviceRequest();
//   // const deviceServiceClient = new deviceService.DeviceServiceClient(
//   //   'test',
//   //   grpc.credentials.createInsecure()
//   // );
//   // deviceServiceClient.list(deb_req, metadata);
//   // deviceServiceClient.create(deb_req, metadata, null);

//   console.log('it is done')
// });


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

  async list_devices(callback, authtoken: string) {
    // Create the client for the 'internal' service

    // Create and build the login request message
    // const loginRequest = new internalMessages.LoginRequest();

    // loginRequest.setEmail('admin');
    // loginRequest.setPassword('admin');

    // Send the login request
    // this.internalServiceClient.login(loginRequest, (error, response) => {
    // Build a gRPC metadata object, setting the authorization key to the JWT we
    // got back from logging in.
    // const metadata = new grpc.Metadata();
    // metadata.set('authorization', response.getJwt());

    // This metadata can now be passed for requests to APIs that require authorization
    // e.g.
    const metadata2 = new grpc.Metadata();
    metadata2.set('authorization', 'Bearer ' + authtoken);
    const createDeviceRequest = new deviceMessages.ListDeviceRequest();
    createDeviceRequest.setLimit(1000);
    createDeviceRequest.setApplicationId(1);
    this.deviceServiceClient.list(createDeviceRequest, metadata2, callback);
    // });
    // this.deviceServiceClient.list(
    //   this.listDeviceRequest,
    //   this.metadata,
    //   (error, response) => {
    //     console.log(response.toArray());
    //     return response;
    //   }
    // );
  }
}










