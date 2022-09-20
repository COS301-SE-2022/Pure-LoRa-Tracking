import { AiAiProcessingModule } from '@lora/ai/processing';
import { Module } from '@nestjs/common';
import { ProcessingApiProcessingBusModule } from '@processing/bus';
import { MessageQueueService } from './message-queue.service';

@Module({
  imports:[ProcessingApiProcessingBusModule, AiAiProcessingModule],
  controllers: [],
  providers: [MessageQueueService],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
