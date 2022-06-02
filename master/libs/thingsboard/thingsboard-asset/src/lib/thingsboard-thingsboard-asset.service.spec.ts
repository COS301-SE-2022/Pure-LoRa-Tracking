import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardAssetService } from './thingsboard-thingsboard-asset.service';

describe('ThingsboardThingsboardAssetService', () => {
  let service: ThingsboardThingsboardAssetService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardAssetService],
    }).compile();

    service = module.get(ThingsboardThingsboardAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
