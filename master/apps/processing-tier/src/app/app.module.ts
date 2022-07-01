import { DatabaseProxyModule } from '@lora/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProcessingApiRouterModule } from 'libs/processing-api/router/src';

@Module({
  imports: [ProcessingApiRouterModule,
    ConfigModule.forRoot(),
    DatabaseProxyModule]
})
export class AppModule {}
