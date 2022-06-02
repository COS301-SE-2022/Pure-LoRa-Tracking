import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Module } from '@nestjs/common';
import { ApiMapEndpointController } from './api-map-endpoint.controller';
import { ApiMapEndpointService } from './api-map-endpoint.service';

@Module({
  imports : [ThingsboardThingsboardClientModule],
  controllers: [ApiMapEndpointController],
  providers: [ApiMapEndpointService],
  exports: [ApiMapEndpointService],
})
export class ApiMapEndpointModule {}
