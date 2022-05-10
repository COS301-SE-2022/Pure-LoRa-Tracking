import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';

describe('ThingsboardThingsboardClientService', () => {
  let service: ThingsboardThingsboardClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardClientService],
    }).compile();

    service = module.get(ThingsboardThingsboardClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
