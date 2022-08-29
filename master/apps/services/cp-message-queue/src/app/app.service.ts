import { Injectable } from '@nestjs/common';
import { QueueFactoryService } from 'libs/message-queue/src/lib/queue-factory/queue-factory.service';

@Injectable()
export class AppService {
  constructor(private qf:QueueFactoryService) {
    
  }
  getData(): { message: string } {
    return { message: 'Welcome to cp-message-queue!' };
  }
}
