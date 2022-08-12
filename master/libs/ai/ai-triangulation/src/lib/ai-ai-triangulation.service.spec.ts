import { Test } from '@nestjs/testing';
import { AiTriangulationService } from './ai-ai-triangulation.service';

describe('AiAiTriangulationService', () => {
  let service: AiTriangulationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiTriangulationService],
    }).compile();

    service = module.get(AiTriangulationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
