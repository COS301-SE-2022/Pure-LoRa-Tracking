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

  it('tf -> create, fit, save', async() => {
    const learn = service.deconstructData(learning.coordinates);
    const train = service.deconstructData([learning.truePoint]);
    await service.fitModel(learn, train)
  });
});

const learning = {
  "sensorID": "237",
  "coordinates": [
      {
          "longitude": 28.232004016901694,
          "latitude": -25.75487005210394,
          "timestamp": 1658591224.802882
      },
      {
          "longitude": 28.232028001909125,
          "latitude": -25.75497247970504,
          "timestamp": 1658591164.802882
      },
      {
          "longitude": 28.232144672918636,
          "latitude": -25.75479656184752,
          "timestamp": 1658591104.802882
      },
      {
          "longitude": 28.23224713986215,
          "latitude": -25.754988142707298,
          "timestamp": 1658591044.802882
      },
      {
          "longitude": 28.232000062956317,
          "latitude": -25.75490933346092,
          "timestamp": 1658590984.802882
      },
      {
          "longitude": 28.232091475697388,
          "latitude": -25.755083932204677,
          "timestamp": 1658590924.802882
      },
      {
          "longitude": 28.232113357950617,
          "latitude": -25.755085412921943,
          "timestamp": 1658590864.802882
      },
      {
          "longitude": 28.232218127787363,
          "latitude": -25.755037867933883,
          "timestamp": 1658590804.802882
      },
      {
          "longitude": 28.232136629245534,
          "latitude": -25.754851322164843,
          "timestamp": 1658590744.802882
      },
      {
          "longitude": 28.232124750256713,
          "latitude": -25.75505692494357,
          "timestamp": 1658590684.802882
      }
  ],
  "truePoint": {
      "latitude": -25.75509406188468,
      "longitude": 28.231975448992934
  }
}
