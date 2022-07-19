import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiLoginEndpointService } from './api-login-endpoint.service';

describe('ApiLoginEndpointService', () => {
  let service: ApiLoginEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ThingsboardThingsboardClientModule],
      providers: [ApiLoginEndpointService],
      
    }).compile();

    service = module.get(ApiLoginEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('login and get info', async() => {
    console.log(await service.doLogin({username:'reserveuser@reserve.com', password:'reserve'}))
  });
});
