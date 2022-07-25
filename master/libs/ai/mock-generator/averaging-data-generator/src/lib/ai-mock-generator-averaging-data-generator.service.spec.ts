import { Test } from '@nestjs/testing';
import { AiMockGeneratorAveragingDataGeneratorService } from './ai-mock-generator-averaging-data-generator.service';

describe('AiMockGeneratorAveragingDataGeneratorService', () => {
  let service: AiMockGeneratorAveragingDataGeneratorService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiMockGeneratorAveragingDataGeneratorService],
    }).compile();

    service = module.get(AiMockGeneratorAveragingDataGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
