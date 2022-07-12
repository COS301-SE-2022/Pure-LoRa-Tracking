import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Module, Global } from '@nestjs/common';
import { ApiReserveEndpointController } from './api-reserve-endpoint.controller';
import { ApiReserveEndpointService } from './api-reserve-endpoint.service';

@Global()
@Module({
  controllers: [ApiReserveEndpointController],
  providers: [ApiReserveEndpointService],
  exports: [ApiReserveEndpointService],
  imports : [ThingsboardThingsboardClientModule]
})
export class ApiReserveEndpointModule {}
