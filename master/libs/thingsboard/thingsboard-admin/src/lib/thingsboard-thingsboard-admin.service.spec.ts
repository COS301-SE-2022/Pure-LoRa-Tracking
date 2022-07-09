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

  it('should retrieve a list of customers that are owned by the tenant', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.getCustomersOfTenant('', 5, 0));
  });

  it('should retrieve a list of tenants', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.getCustomersOfTenant('', 5, 0));
  });
});
