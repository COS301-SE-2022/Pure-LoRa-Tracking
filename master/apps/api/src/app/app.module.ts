import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiApiRouterModule } from '@lora/apiRouter'
import { MiddlewareHttpLoggerService } from '@lora/middleware/logger';
import { MiddlewareSessionManagementService } from '@lora/middleware/session-management';

@Module({
  imports: [ApiApiRouterModule,ConfigModule.forRoot()],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(MiddlewareHttpLoggerService).forRoutes("/");
      consumer.apply(MiddlewareSessionManagementService).forRoutes("/");
  }
}
