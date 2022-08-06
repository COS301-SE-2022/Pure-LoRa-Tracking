import { DatabaseProxyModule } from '@lora/database';
import { ProcessingApiRouterModule } from '@lora/processing/api/router';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ProcessingBus } from '@processing/bus';

@Module({
  imports: [
    ProcessingApiRouterModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    ProcessingBus,
    DatabaseProxyModule,
  ],
})
export class AppModule {}
