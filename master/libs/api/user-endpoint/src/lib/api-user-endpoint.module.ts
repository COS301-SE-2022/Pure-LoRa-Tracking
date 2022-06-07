import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Module, Global } from '@nestjs/common';
import { ApiUserEndpointController } from './api-user-endpoint.controller';
import { ApiUserEndpointService } from './api-user-endpoint.service';

@Global()
@Module({
  imports : [ThingsboardThingsboardClientModule],
  controllers: [ApiUserEndpointController],
  providers: [ApiUserEndpointService],
  exports: [ApiUserEndpointService],
})
export class ApiUserEndpointModule {}
