import { Test } from '@nestjs/testing';
import { ApiLoginEndpointService } from './api-login-endpoint.service';

describe('ApiLoginEndpointService', () => {
  let service: ApiLoginEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiLoginEndpointService],
    }).compile();

    service = module.get(ApiLoginEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
