import { Test } from '@nestjs/testing';
import { MessageQueueService } from './message-queue.service';

describe('MessageQueueService', () => {
  let service: MessageQueueService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MessageQueueService],
    }).compile();

    service = module.get(MessageQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
