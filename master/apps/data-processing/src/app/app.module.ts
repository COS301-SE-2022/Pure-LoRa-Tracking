import { DatabaseProxyModule } from '@lora/database';
import { ProcessingApiRouterModule } from '@lora/processing/api/router';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProcessingApiRouterModule,
    ConfigModule.forRoot(),
    DatabaseProxyModule]
})
export class AppModule {}
