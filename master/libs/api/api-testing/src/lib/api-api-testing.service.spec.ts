import { Test } from '@nestjs/testing';
import { ApiApiTestingService } from './api-api-testing.service';

describe('ApiApiTestingService', () => {
  let service: ApiApiTestingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiApiTestingService],
    }).compile();

    service = module.get(ApiApiTestingService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
