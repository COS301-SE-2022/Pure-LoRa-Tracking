import { Test, TestingModule } from '@nestjs/testing';
import { QueueFactoryService } from './queue-factory.service';

describe('QueueFactoryService', () => {
  let service: QueueFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueFactoryService],
    }).compile();

    service = module.get<QueueFactoryService>(QueueFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
