import { Module } from '@nestjs/common';
import { ApiMapEndpointModule } from '@lora/api/mapEndpoint'
import { ApiHardwareDebugModule } from '@lora/hardware-debug';

@Module({
  imports : [
    ApiMapEndpointModule,
    ApiHardwareDebugModule
  ]
})
export class ApiApiRouterModule {}
