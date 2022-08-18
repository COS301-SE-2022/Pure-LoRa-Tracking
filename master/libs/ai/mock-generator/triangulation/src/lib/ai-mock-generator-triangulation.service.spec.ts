import { LocationModule } from '@lora/location';
import { Test } from '@nestjs/testing';
import { AiMockGeneratorTriangulationService } from './ai-mock-generator-triangulation.service';

describe('AiMockGeneratorTriangulationService', () => {
  let service: AiMockGeneratorTriangulationService;
  let gateways: {latitude:number, longitude:number}[];
  let sensor: {latitude:number, longitude:number};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LocationModule],
      providers: [AiMockGeneratorTriangulationService],
    }).compile();

    service = module.get(AiMockGeneratorTriangulationService);
    gateways = [
      {
        longitude : 28.22651758790016,
        latitude: -25.79089916441019,
      },
      {
        longitude: 28.226017355918884,
        latitude: -25.79136043396041,
      },
      {
        longitude: 28.226116597652435,
        latitude: -25.7910030105911,
      },
    ]

    sensor = {
      latitude : -25.791054933647445,
      longitude : 28.22622790932655
    }
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should give random coordinate in triangle', () => {
    expect(service.randomSensor(gateways)).toBeCalled
  })
  
  it('should return the rssi for a sensor and gateway set', () => {
    expect(service.generateRSSIlist(sensor, gateways)).toBeCalled
  })

  it('should generate a batch to train with', () => {
    expect(service.generateBatches(gateways,5)).toBeCalled
  })


});
