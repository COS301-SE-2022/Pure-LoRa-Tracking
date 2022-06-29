import { Module, Global } from '@nestjs/common';
import { MiddlewareHttpLoggerService } from './middleware-http-logger.service';

@Global()
@Module({
  controllers: [],
  providers: [MiddlewareHttpLoggerService],
  exports: [MiddlewareHttpLoggerService],
})
export class MiddlewareHttpLoggerModule {}
