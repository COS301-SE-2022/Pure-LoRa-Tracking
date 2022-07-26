import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiLoginEndpointController, ApiLogoutEndpointController } from './api-login-endpoint.controller';
import { ApiLoginEndpointService } from './api-login-endpoint.service';


describe('ApiLoginEndpointController', () => {
  let controller: ApiLoginEndpointController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ThingsboardThingsboardClientModule],
      providers: [ApiLoginEndpointService],
      controllers: [ApiLoginEndpointController, ApiLogoutEndpointController],
    }).compile();

    controller = module.get(ApiLoginEndpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
