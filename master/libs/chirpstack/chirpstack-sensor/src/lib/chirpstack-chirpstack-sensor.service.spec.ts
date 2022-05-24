import { Test } from '@nestjs/testing';
import { ChirpstackChirpstackSensorService } from './chirpstack-chirpstack-sensor.service';

describe('ChirpstackChirpstackSensorService', () => {
  let service: ChirpstackChirpstackSensorService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChirpstackChirpstackSensorService],
    }).compile();

    service = module.get(ChirpstackChirpstackSensorService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
