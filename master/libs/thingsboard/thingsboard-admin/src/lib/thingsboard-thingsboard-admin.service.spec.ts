import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardAdminService } from './thingsboard-thingsboard-admin.service';

describe('ThingsboardThingsboardAdminService', () => {
  let service: ThingsboardThingsboardAdminService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardAdminService],
    }).compile();

    service = module.get(ThingsboardThingsboardAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
