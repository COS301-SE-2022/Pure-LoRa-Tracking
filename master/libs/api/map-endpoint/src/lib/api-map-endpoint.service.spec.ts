import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiMapEndpointService } from './api-map-endpoint.service';

describe('ApiMapEndpointService', () => {
  let service: ApiMapEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [ThingsboardThingsboardClientModule],
      providers: [ApiMapEndpointService],
    }).compile();

    service = module.get(ApiMapEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
