import { Test } from '@nestjs/testing';
import { ProcessingApiProcessingBusModule } from '@processing/bus';
import { MessageQueueService } from './message-queue.service';

describe('MessageQueueService', () => {
  let service: MessageQueueService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MessageQueueService],
      imports:[ProcessingApiProcessingBusModule]
    }).compile();

    service = module.get(MessageQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
