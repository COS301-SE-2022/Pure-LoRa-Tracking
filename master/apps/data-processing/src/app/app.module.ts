import { DatabaseProxyModule } from '@lora/database';
import { DatabaseDbProxyModule } from '@lora/db-proxy';
import { ProcessingApiRouterModule } from '@lora/processing/api/router';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ProcessingApiRouterModule,
    //ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    DatabaseProxyModule,
  ],
})
export class AppModule {}
