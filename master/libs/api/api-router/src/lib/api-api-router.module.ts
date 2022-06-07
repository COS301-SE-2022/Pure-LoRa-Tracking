import { Module } from '@nestjs/common';
import { ApiMapEndpointModule } from '@lora/api/mapEndpoint'
import { ApiHardwareDebugModule } from '@lora/hardware-debug';
import { ApiDeviceEndpointModule } from '@lora/device-endpoint';
import { ApiUserEndpointModule } from '@lora/api/user-endpoint';

@Module({
  imports : [
    ApiMapEndpointModule,
    ApiHardwareDebugModule,
    ApiDeviceEndpointModule,
    ApiUserEndpointModule
  ]
})
export class ApiApiRouterModule {}
