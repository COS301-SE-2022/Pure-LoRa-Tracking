import { Test } from '@nestjs/testing';
import { ApiLoginEndpointController } from './api-login-endpoint.controller';
import { ApiLoginEndpointService } from './api-login-endpoint.service';

describe('ApiLoginEndpointController', () => {
  let controller: ApiLoginEndpointController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiLoginEndpointService],
      controllers: [ApiLoginEndpointController],
    }).compile();

    controller = module.get(ApiLoginEndpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
