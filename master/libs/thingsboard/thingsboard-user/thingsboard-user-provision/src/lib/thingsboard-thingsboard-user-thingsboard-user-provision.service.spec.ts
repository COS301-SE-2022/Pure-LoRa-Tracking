import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardUserThingsboardUserProvisionService } from './thingsboard-thingsboard-user-thingsboard-user-provision.service';

describe('ThingsboardThingsboardUserThingsboardUserProvisionService', () => {
  let service: ThingsboardThingsboardUserThingsboardUserProvisionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardUserThingsboardUserProvisionService],
    }).compile();

    service = module.get(
      ThingsboardThingsboardUserThingsboardUserProvisionService
    );
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
