import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiReserveEndpointController } from './api-reserve-endpoint.controller';
import { ApiReserveEndpointService } from './api-reserve-endpoint.service';

describe('ApiReserveEndpointController', () => {
  let controller: ApiReserveEndpointController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiReserveEndpointService],
      controllers: [ApiReserveEndpointController],
      imports : [ThingsboardThingsboardClientModule]
    }).compile();

    controller = module.get(ApiReserveEndpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
