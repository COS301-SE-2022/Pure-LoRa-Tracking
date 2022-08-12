import { Test } from '@nestjs/testing';
import { AiMockGeneratorTriangulationService } from './ai-mock-generator-triangulation.service';

describe('AiMockGeneratorTriangulationService', () => {
  let service: AiMockGeneratorTriangulationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiMockGeneratorTriangulationService],
    }).compile();

    service = module.get(AiMockGeneratorTriangulationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
