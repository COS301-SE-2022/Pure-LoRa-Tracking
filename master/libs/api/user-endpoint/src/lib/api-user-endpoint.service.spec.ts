import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiUserEndpointService } from './api-user-endpoint.service';

describe('ApiUserEndpointService', () => {
  let service: ApiUserEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [ThingsboardThingsboardClientModule],
      providers: [ApiUserEndpointService],
    }).compile();

    service = module.get(ApiUserEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
