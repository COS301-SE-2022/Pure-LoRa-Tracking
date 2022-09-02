import { Module } from '@nestjs/common';
import { MessageQueueService } from './message-queue.service';

@Module({
  controllers: [],
  providers: [MessageQueueService],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
