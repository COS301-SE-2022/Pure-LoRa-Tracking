import { Test } from '@nestjs/testing';
import { AiHeatmapAverageService } from './ai-heatmap-average.service';

describe('AiHeatmapAverageService', () => {
  let service: AiHeatmapAverageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiHeatmapAverageService],
    }).compile();

    service = module.get(AiHeatmapAverageService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('tf -> save', async() => {
    console.log(
      await service.saveModel()
    )
  });
});
