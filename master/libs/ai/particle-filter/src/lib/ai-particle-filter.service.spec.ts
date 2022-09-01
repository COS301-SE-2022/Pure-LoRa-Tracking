import { Test } from '@nestjs/testing';
import { AiParticleFilterService } from './ai-particle-filter.service';

describe('AiParticleFilterService', () => {
  let service: AiParticleFilterService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiParticleFilterService],
    }).compile();

    service = module.get(AiParticleFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
