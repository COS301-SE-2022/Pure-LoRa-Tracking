import { Module } from '@nestjs/common';
import { ApiMapEndpointModule } from '@lora/api/mapEndpoint'
import { ApiHardwareDebugModule } from '@lora/hardware-debug';
import { ApiDeviceEndpointModule } from '@lora/device-endpoint';

@Module({
  imports : [
    ApiMapEndpointModule,
    ApiHardwareDebugModule,
    ApiDeviceEndpointModule
  ]
})
export class ApiApiRouterModule {}
