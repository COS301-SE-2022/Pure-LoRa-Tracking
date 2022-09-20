import { MessageQueueService } from '@master/message-queue';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private msgq:MessageQueueService){
    msgq.runRabbit();
  }

  getData(): { message: string } {
    return { message: 'Welcome to cp-message-queue!' };
  }
}
