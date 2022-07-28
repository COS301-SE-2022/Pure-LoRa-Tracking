import { Module, Global } from '@nestjs/common';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
@Global()
@Module({
  imports:[ThingsboardThingsboardClientModule],
  controllers: [],
  providers: [MiddlewareSessionManagementService],
  exports: [MiddlewareSessionManagementService],
})
export class MiddlewareSessionManagementModule {}
