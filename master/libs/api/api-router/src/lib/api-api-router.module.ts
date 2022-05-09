import { Module } from '@nestjs/common';
import { ApiMapEndpointModule } from '@lora/api/mapEndpoint'

@Module({
  imports : [
    ApiMapEndpointModule
  ]
})
export class ApiApiRouterModule {}
