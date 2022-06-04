import { Test } from '@nestjs/testing';
import { ChirpstackService } from './chirpstack.service';

describe('ChirpstackService', () => {
  let service: ChirpstackService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChirpstackService],
    }).compile();

    service = module.get(ChirpstackService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
