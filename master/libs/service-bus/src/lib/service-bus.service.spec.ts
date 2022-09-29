import { DatabaseProxyModule } from '@lora/database';
import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ServiceBusService } from './service-bus.service';

describe('ServiceBusService', () => {
  let service: ServiceBusService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule, DatabaseProxyModule],
      providers: [ServiceBusService],
    }).compile();

    service = module.get(ServiceBusService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be get device info', async () => {
    expect(await service.getMoreInfo('TEST')).toBeUndefined();
  });
});
