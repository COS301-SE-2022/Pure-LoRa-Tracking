import { Module } from '@nestjs/common';
import { ProcessingApiProcessingBusModule } from '@processing/bus';
import { MessageQueueService } from './message-queue.service';

@Module({
  imports:[ProcessingApiProcessingBusModule],
  controllers: [],
  providers: [MessageQueueService],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
