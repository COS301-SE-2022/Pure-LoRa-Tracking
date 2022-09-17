import { Module } from '@nestjs/common';
import { ProcessingApiProcessingBusModule } from '@processing/bus';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProcessingApiProcessingBusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
