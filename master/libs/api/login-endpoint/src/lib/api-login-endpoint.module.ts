import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Module, Global } from '@nestjs/common';
import { ApiLoginEndpointController, ApiLogoutEndpointController } from './api-login-endpoint.controller';
import { ApiLoginEndpointService } from './api-login-endpoint.service';

@Global()
@Module({
  controllers: [ApiLoginEndpointController, ApiLogoutEndpointController],
  providers: [ApiLoginEndpointService],
  exports: [ApiLoginEndpointService],
  imports: [ThingsboardThingsboardClientModule]
})
export class ApiLoginEndpointModule {}
