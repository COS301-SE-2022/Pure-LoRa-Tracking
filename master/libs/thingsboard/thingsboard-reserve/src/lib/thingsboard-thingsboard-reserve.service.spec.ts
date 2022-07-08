import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardReserveService } from './thingsboard-thingsboard-reserve.service';

describe('ThingsboardThingsboardReserveService', () => {
  let service: ThingsboardThingsboardReserveService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardReserveService],
    }).compile();

    service = module.get(ThingsboardThingsboardReserveService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
