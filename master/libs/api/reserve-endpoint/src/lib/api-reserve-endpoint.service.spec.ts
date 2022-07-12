import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiReserveEndpointService } from './api-reserve-endpoint.service';

describe('ApiReserveEndpointService', () => {
  let service: ApiReserveEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiReserveEndpointService],
      imports : [ThingsboardThingsboardClientModule]
    }).compile();

    service = module.get(ApiReserveEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
