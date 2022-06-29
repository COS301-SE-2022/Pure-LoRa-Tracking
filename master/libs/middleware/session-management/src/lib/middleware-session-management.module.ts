import { Module, Global } from '@nestjs/common';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';

@Global()
@Module({
  controllers: [],
  providers: [MiddlewareSessionManagementService],
  exports: [MiddlewareSessionManagementService],
})
export class MiddlewareSessionManagementModule {}
