import { particleFilterMultinomialService } from '@lora/ai/particle-filter';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, particleFilterMultinomialService],
  providers: [AppService],
})
export class AppModule {}
