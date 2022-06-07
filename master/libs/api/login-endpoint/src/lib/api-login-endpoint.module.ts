import { Module, Global } from '@nestjs/common';
import { ApiLoginEndpointController } from './api-login-endpoint.controller';
import { ApiLoginEndpointService } from './api-login-endpoint.service';

@Global()
@Module({
  controllers: [ApiLoginEndpointController],
  providers: [ApiLoginEndpointService],
  exports: [ApiLoginEndpointService],
})
export class ApiLoginEndpointModule {}
