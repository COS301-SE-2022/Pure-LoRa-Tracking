import { Test } from '@nestjs/testing';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LocationService],
    }).compile();

    service = module.get(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
