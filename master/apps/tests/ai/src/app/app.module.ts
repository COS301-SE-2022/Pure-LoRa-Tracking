import { particleFilterMultinomialService } from '@lora/ai/particle-filter';
import { LocationModule } from '@lora/location';
import { Module } from '@nestjs/common';
import { ProcessingApiProcessingBusModule } from '@processing/bus';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [LocationModule, ProcessingApiProcessingBusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
