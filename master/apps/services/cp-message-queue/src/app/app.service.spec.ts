import { MessageQueueModule } from '@master/message-queue';
import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports:[MessageQueueModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to cp-message-queue!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to cp-message-queue!',
      });
    });
  });
});
