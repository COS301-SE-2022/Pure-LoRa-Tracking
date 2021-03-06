import { Module } from '@nestjs/common';
import { ApiMapEndpointModule } from '@lora/api/mapEndpoint'
import { ApiHardwareDebugModule } from '@lora/hardware-debug';
import { ApiDeviceEndpointModule } from '@lora/device-endpoint';
import { ApiUserEndpointModule } from '@lora/api/user-endpoint';
import { ApiLoginEndpointModule } from '@lora/api/login';
import { ApiReserveEndpointModule } from '@lora/api/reserve';

@Module({
  imports : [
    ApiMapEndpointModule,
    ApiHardwareDebugModule,
    ApiDeviceEndpointModule,
    ApiUserEndpointModule,
    ApiLoginEndpointModule,
    ApiReserveEndpointModule
  ]
})
export class ApiApiRouterModule {}
