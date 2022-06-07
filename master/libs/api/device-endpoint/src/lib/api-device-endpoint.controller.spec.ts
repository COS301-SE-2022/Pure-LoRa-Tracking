import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiDeviceEndpointController } from './api-device-endpoint.controller';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';

describe('ApiDeviceEndpointController', () => {
  let controller: ApiDeviceEndpointController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports :[ThingsboardThingsboardClientModule],
      providers: [ApiDeviceEndpointService],
      controllers: [ApiDeviceEndpointController],
    }).compile();

    controller = module.get(ApiDeviceEndpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
