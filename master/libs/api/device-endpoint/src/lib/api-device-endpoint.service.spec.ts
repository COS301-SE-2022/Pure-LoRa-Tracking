import { Test } from '@nestjs/testing';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

describe('ApiDeviceEndpointService', () => {
  let service: ApiDeviceEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDeviceEndpointService],
    }).compile();

    service = module.get(ApiDeviceEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
