import { Module, Global } from '@nestjs/common';
import { ApiDeviceEndpointController } from './api-device-endpoint.controller';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

@Global()
@Module({
  controllers: [ApiDeviceEndpointController],
  providers: [ApiDeviceEndpointService],
  exports: [ApiDeviceEndpointService],
})
export class ApiDeviceEndpointModule {}
