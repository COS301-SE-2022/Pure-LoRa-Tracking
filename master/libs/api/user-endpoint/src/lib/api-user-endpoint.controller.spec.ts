import { Test } from '@nestjs/testing';
import { ApiUserEndpointController } from './api-user-endpoint.controller';
import { ApiUserEndpointService } from './api-user-endpoint.service';

describe('ApiUserEndpointController', () => {
  let controller: ApiUserEndpointController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUserEndpointService],
      controllers: [ApiUserEndpointController],
    }).compile();

    controller = module.get(ApiUserEndpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
