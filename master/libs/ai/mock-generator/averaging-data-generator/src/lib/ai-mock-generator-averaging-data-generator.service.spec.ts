import { Test } from '@nestjs/testing';
import {
  AiMockGeneratorAveragingDataGeneratorService,
  AverageInputInterface,
} from './ai-mock-generator-averaging-data-generator.service';

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

  it('should generate 3 entries of data with 4 points', () => {
    const result: AverageInputInterface[] = service.generateData(3, 4);
    console.log(result);
  });
});
