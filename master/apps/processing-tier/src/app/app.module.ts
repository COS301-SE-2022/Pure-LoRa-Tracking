import { DatabaseProxyModule } from '@lora/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProcessingApiRouterModule } from '@lora/processing/api/router';

@Module({
  imports: [ProcessingApiRouterModule,
    ConfigModule.forRoot(),
    DatabaseProxyModule]
})
export class AppModule {}
