//import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardAdminService } from './thingsboard-thingsboard-admin.service';

describe('ThingsboardThingsboardAdminService', () => {
  let service: ThingsboardThingsboardAdminService;
  //let clientService : ThingsboardThingsboardClientService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardAdminService],
      imports : [HttpModule, /*ThingsboardThingsboardClientModule*/]
    }).compile();

    service = module.get(ThingsboardThingsboardAdminService);
    //clientService = module.get(ThingsboardThingsboardClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
/*
  it('should retrieve a list of customers that are owned by the tenant', async () => {
    const Login = await clientService.loginUserReturnToken("reserveadmin@reserve.com", "reserve");
    service.setToken(Login.Token);
    console.table((await service.getCustomersOfTenant(100,0)).data);
  });

  it('should retrieve a list of tenants', async () => {
    const Login = await clientService.loginUserReturnToken("server@thingsboard.org", "thingsboardserveraccountissecure");
    service.setToken(Login.Token);
    console.table((await service.getTenantInfos(100,0)).data[0]);
  });

  it('should retrieve tenant group info', async () => {
    const Login = await clientService.loginUserReturnToken("server@thingsboard.org", "thingsboardserveraccountissecure");
    service.setToken(Login.Token);
    console.table((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15")).data.additionalInfo);
  });*/
});
