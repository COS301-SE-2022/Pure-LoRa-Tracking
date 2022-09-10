import { LocationModule } from '@lora/location';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { AiParticleFilterService } from './ai-particle-filter.service';

describe('AiParticleFilterService', () => {
  let service: AiParticleFilterService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports:[LocationModule, ThingsboardThingsboardClientModule],
      providers: [AiParticleFilterService],
    }).compile();

    service = module.get(AiParticleFilterService);

    service.addInitialParamters(initialParameters)

  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a random point', () => {
    expect(service.generatePolygonSamples(1000)).toBe(true);
  });
});


const initialParameters = {
  reservePolygon : [
    {
      longitude:28.25060248374939,
      latitude:-25.749709741477048
    },
    {
      longitude:28.25075268745422,
      latitude:-25.7486177646462
    },
    {
      longitude:28.249357938766476,
      latitude:-25.748182903821597
    
    },
    {
      longitude:28.248413801193237,
      latitude:-25.74940051011898
    },
    {
      longitude:28.25060248374939,
      latitude:-25.749709741477048
    }
  ],
  gateways : [
    {
      longitude:28.250527381896973,
      latitude:-25.748791708530312
    },
    {
      longitude:28.249475955963135,
      latitude:-25.748482474782456
    },
    {
      longitude:28.249014616012573,
      latitude:-25.74928454815217
    },
    {
      longitude:28.250334262847897,
      latitude:-25.749487481519804
    },
    {
      longitude:28.250527381896973,
      latitude:-25.748791708530312
    }
  ]
}
