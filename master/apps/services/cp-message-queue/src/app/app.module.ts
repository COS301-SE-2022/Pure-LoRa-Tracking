import { MessageQueueModule } from '@master/message-queue';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MessageQueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
