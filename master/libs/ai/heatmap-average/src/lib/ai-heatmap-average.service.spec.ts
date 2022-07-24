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

  /* it('tf -> create, fit, save', async() => {
    const learn = service.normalizePoints(service.deconstructData(learning.coordinates));
    const train = service.normalizePoints(service.deconstructData([learning.truePoint]));
    await service.fitModel(learn, train)

    const ToPredictData = service.normalizePoints(service.deconstructData(mock2.coordinates));
    console.log(await service.predictData(ToPredictData))
  });*/

  /* This test will fail because running saveModel in 
     Jest results in an exception. */

  it('tf -> create, fit, save, load', async () => {
    const learn = service.normalizePoints(
      service.deconstructData(learning.coordinates)
    );
    const train = service.normalizePoints(
      service.deconstructData([learning.truePoint])
    );
    await service.fitModel(learn, train);

    const ToPredictData = service.normalizePoints(
      service.deconstructData(mock2.coordinates)
    );

    const predictedDataToMatch = await service.predictData(ToPredictData);

    await service.saveModel();
    await service.loadModel();

    const resultantData = await service.predictData(ToPredictData);

    expect(resultantData).toEqual(predictedDataToMatch);
  });
});

const learning = {
  sensorID: '237',
  coordinates: [
    {
      longitude: 28.232004016901694,
      latitude: -25.75487005210394,
      timestamp: 1658591224.802882,
    },
    {
      longitude: 28.232028001909125,
      latitude: -25.75497247970504,
      timestamp: 1658591164.802882,
    },
    {
      longitude: 28.232144672918636,
      latitude: -25.75479656184752,
      timestamp: 1658591104.802882,
    },
    {
      longitude: 28.23224713986215,
      latitude: -25.754988142707298,
      timestamp: 1658591044.802882,
    },
    {
      longitude: 28.232000062956317,
      latitude: -25.75490933346092,
      timestamp: 1658590984.802882,
    },
    {
      longitude: 28.232091475697388,
      latitude: -25.755083932204677,
      timestamp: 1658590924.802882,
    },
    {
      longitude: 28.232113357950617,
      latitude: -25.755085412921943,
      timestamp: 1658590864.802882,
    },
    {
      longitude: 28.232218127787363,
      latitude: -25.755037867933883,
      timestamp: 1658590804.802882,
    },
    {
      longitude: 28.232136629245534,
      latitude: -25.754851322164843,
      timestamp: 1658590744.802882,
    },
    {
      longitude: 28.232124750256713,
      latitude: -25.75505692494357,
      timestamp: 1658590684.802882,
    },
  ],
  truePoint: {
    latitude: -25.75509406188468,
    longitude: 28.231975448992934,
  },
};

const mock2 = {
  sensorID: '61',
  coordinates: [
    {
      longitude: 28.231276076476696,
      latitude: -25.754835366717963,
      timestamp: 1658591224.804912,
    },
    {
      longitude: 28.23139654961753,
      latitude: -25.754943382355272,
      timestamp: 1658591164.804912,
    },
    {
      longitude: 28.231434842717004,
      latitude: -25.754825677272407,
      timestamp: 1658591104.804912,
    },
    {
      longitude: 28.231449902293022,
      latitude: -25.754843500962245,
      timestamp: 1658591044.804912,
    },
    {
      longitude: 28.231424036539437,
      latitude: -25.754992407375003,
      timestamp: 1658590984.804912,
    },
    {
      longitude: 28.231318584021327,
      latitude: -25.754844272417035,
      timestamp: 1658590924.804912,
    },
    {
      longitude: 28.231476652690656,
      latitude: -25.755044579477204,
      timestamp: 1658590864.804912,
    },
    {
      longitude: 28.23125759490698,
      latitude: -25.754830819196677,
      timestamp: 1658590804.804912,
    },
    {
      longitude: 28.231215229336584,
      latitude: -25.75487339896181,
      timestamp: 1658590744.804912,
    },
    {
      longitude: 28.231466456568405,
      latitude: -25.75507576072623,
      timestamp: 1658590684.804912,
    },
  ],
  truePoint: {
    latitude: -25.755087919108906,
    longitude: 28.231181234189105,
  },
};
