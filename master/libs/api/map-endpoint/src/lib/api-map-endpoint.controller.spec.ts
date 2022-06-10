import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiMapEndpointController } from './api-map-endpoint.controller';
import { ApiMapEndpointService } from './api-map-endpoint.service';

describe('ApiMapEndpointController', () => {
  let controller: ApiMapEndpointController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [ThingsboardThingsboardClientModule],
      providers: [ApiMapEndpointService],
      controllers: [ApiMapEndpointController],
    }).compile();

    controller = module.get(ApiMapEndpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

});
