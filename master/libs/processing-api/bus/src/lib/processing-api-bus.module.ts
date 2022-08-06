import { Module } from '@nestjs/common';
import { ProcessingBus } from './processing-api-bus.service';

@Module({
  controllers: [],
  providers: [ProcessingBus],
  exports: [ProcessingBus],
})
export class ProcessingApiBusModule {}
