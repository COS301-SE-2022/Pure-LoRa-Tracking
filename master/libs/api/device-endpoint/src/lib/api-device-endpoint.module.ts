import { ChirpstackChirpstackGatewayModule } from '@chirpstack/gateway';
import { ChirpstackChirpstackSensorModule } from '@chirpstack/sensor';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Module, Global } from '@nestjs/common';
import { ApiDeviceEndpointController } from './api-device-endpoint.controller';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

@Module({
  imports : [ThingsboardThingsboardClientModule, ChirpstackChirpstackGatewayModule, ChirpstackChirpstackSensorModule],
  controllers: [ApiDeviceEndpointController],
  providers: [ApiDeviceEndpointService],
  exports: [ApiDeviceEndpointService],
})
export class ApiDeviceEndpointModule {}
