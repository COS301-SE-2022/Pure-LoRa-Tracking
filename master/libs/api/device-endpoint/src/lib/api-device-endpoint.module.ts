import { ChirpstackChirpstackGatewayModule } from '@lora/chirpstack-gateway';
import { ChirpstackChirpstackSensorModule } from '@lora/chirpstack-sensor';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Module, Global } from '@nestjs/common';
import { ApiDeviceEndpointController } from './api-device-endpoint.controller';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

@Module({
  imports : [ThingsboardThingsboardClientModule, ChirpstackChirpstackSensorModule, ChirpstackChirpstackGatewayModule],
  controllers: [ApiDeviceEndpointController],
  providers: [ApiDeviceEndpointService],
  exports: [ApiDeviceEndpointService],
})
export class ApiDeviceEndpointModule {}
