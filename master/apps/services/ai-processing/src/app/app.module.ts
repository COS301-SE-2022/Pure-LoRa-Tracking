import { AiProcessingStrategyModule } from '@lora/ai/strategy';
import { LocationModule } from '@lora/location';
import { Module } from '@nestjs/common';
import { ProcessingApiProcessingBusModule } from '@processing/bus';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProcessingApiProcessingBusModule, AiProcessingStrategyModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
