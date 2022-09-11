import { Test } from '@nestjs/testing';
import { ServiceBusService } from './service-bus.service';

describe('ServiceBusService', () => {
  let service: ServiceBusService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceBusService],
    }).compile();

    service = module.get(ServiceBusService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
