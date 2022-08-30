import { Module } from '@nestjs/common';
import { MessageQueueService } from './message-queue.service';
import { QueueFactoryService } from './queue-factory/queue-factory.service';


@Module({
  controllers: [],
  providers: [MessageQueueService, QueueFactoryService],
  exports: [MessageQueueService, QueueFactoryService],
})
export class MessageQueueModule {

  
}
