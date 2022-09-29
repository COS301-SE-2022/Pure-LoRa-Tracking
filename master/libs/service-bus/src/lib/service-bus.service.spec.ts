import { DatabaseProxyModule } from '@lora/database';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ServiceBusService } from './service-bus.service';
import { of } from 'rxjs';

describe('ServiceBusService', () => {
  let service: ServiceBusService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule, DatabaseProxyModule],
      providers: [ServiceBusService],
    }).compile();

    service = module.get(ServiceBusService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be get device info', async () => {
    expect(await service.getMoreInfo('TEST')).toBeUndefined();
  });

  it('sendMongoDevicePermieter -> success', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(successExample));
    expect(
      await service.sendMongoDevicePerimeter({
        device: 'TEST',
        location: 'Disney Land',
        action: 'TEST',
      })
    ).toBeUndefined();
  });
});

const successExample = {
  headers: {},
  config: {},
  status: 200,
  statusText: 'OK',
  data: 'TEST SUCCESS',
};
