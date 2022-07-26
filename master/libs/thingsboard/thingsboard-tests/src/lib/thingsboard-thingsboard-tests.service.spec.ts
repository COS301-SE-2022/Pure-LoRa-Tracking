import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardTestsService } from './thingsboard-thingsboard-tests.service';

describe('ThingsboardThingsboardTestsService', () => {
  let service: ThingsboardThingsboardTestsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTestsService],
    }).compile();

    service = module.get(ThingsboardThingsboardTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
