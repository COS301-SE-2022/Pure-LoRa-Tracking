import { Test } from '@nestjs/testing';
import { ProcessingApiProcessingBusModule } from '@processing/bus';
import { AiProcessingStrategyService } from './ai-processing-strategy.service';

describe('AiProcessingStrategyService', () => {
  let service: AiProcessingStrategyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports:[ProcessingApiProcessingBusModule],
      providers: [AiProcessingStrategyService],
    }).compile();

    service = module.get(AiProcessingStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
