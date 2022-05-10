import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardDeviceService } from './thingsboard-thingsboard-device.service';

describe('ThingsboardThingsboardDeviceService', () => {
  let service: ThingsboardThingsboardDeviceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardDeviceService],
    }).compile();

    service = module.get(ThingsboardThingsboardDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
