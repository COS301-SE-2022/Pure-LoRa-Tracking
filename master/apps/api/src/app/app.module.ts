import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiApiRouterModule } from '@lora/apiRouter'
import { DatabaseProxyModule } from '@lora/database'
import { MiddlewareHttpLoggerService } from '@lora/middleware/logger';

@Module({
  imports: [ApiApiRouterModule,ConfigModule.forRoot(),
    DatabaseProxyModule
    ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(MiddlewareHttpLoggerService).forRoutes("/")
  }
}
