import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ChirpstackChirpstackSensorService } from './chirpstack-chirpstack-sensor.service';
// import * as grpc from '@grpc/grpc-js';
// import { Metadata } from '@grpc/grpc-js';
// import * as deviceService from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';

// import { DeviceServiceClient } from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [ChirpstackChirpstackSensorService],
  exports: [ChirpstackChirpstackSensorService],
})
export class ChirpstackChirpstackSensorModule {}
