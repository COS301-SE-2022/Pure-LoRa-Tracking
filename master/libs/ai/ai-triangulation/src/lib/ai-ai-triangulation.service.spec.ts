import { Test } from '@nestjs/testing';
import { AiAiTriangulationService } from './ai-ai-triangulation.service';

describe('AiAiTriangulationService', () => {
  let service: AiAiTriangulationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiAiTriangulationService],
    }).compile();

    service = module.get(AiAiTriangulationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
