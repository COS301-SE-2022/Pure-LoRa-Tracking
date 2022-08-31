import { MessageQueueService } from '@master/message-queue';
import { Injectable } from '@nestjs/common';
import { QueueFactoryService } from 'libs/message-queue/src/lib/queue-factory/queue-factory.service';

@Injectable()
export class AppService {
  constructor(private msgq:MessageQueueService) {
    // console.log("start test");
    msgq.STARTTEST();
    msgq.setUpMain();
    msgq.setUpAlt();
    msgq.setUpReady();
    // msgq.DELTETE();
    // setTimeout(() => {
    //   console.log("starting rest")
    // }, 500);

    
  }
  getData(): { message: string } {
    return { message: 'Welcome to cp-message-queue!' };
  }
}
