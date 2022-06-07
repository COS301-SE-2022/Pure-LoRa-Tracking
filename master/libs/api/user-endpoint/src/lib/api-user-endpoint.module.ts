import { Module, Global } from '@nestjs/common';
import { ApiUserEndpointController } from './api-user-endpoint.controller';
import { ApiUserEndpointService } from './api-user-endpoint.service';

@Global()
@Module({
  controllers: [ApiUserEndpointController],
  providers: [ApiUserEndpointService],
  exports: [ApiUserEndpointService],
})
export class ApiUserEndpointModule {}
