import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

describe('ApiDeviceEndpointService', () => {
  let service: ApiDeviceEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports :[ThingsboardThingsboardClientModule],
      providers: [ApiDeviceEndpointService],
    }).compile();

    service = module.get(ApiDeviceEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
