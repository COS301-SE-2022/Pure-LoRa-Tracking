//import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardAdminService } from './thingsboard-thingsboard-admin.service';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTestsModule, ThingsboardThingsboardTestsService } from "@lora/thingsboard/tests";

describe('ThingsboardThingsboardAdminService', () => {
  let service: ThingsboardThingsboardAdminService;
  let httpService: HttpService;
  let userService: ThingsboardThingsboardUserService;
  let testService: ThingsboardThingsboardTestsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardAdminService],
      imports : [HttpModule,ThingsboardThingsboardUserModule, ThingsboardThingsboardTestsModule]
    }).compile();

    service = module.get(ThingsboardThingsboardAdminService);
    httpService = module.get(HttpService);
    userService = module.get(ThingsboardThingsboardUserService);
    testService = module.get(ThingsboardThingsboardTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('customers of tenant -> should retrieve a list of customers that are owned by the tenant', async () => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(testService.axiosTokenSuccessExample));
    const Login = await userService.login("reserveadmin@reserve.com", "reserve");
    service.setToken(Login.data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(testService.axiosCustomersSuccessExample));
    expect((await service.getCustomersOfTenant(100,0))).toMatchObject(testService.SuccessResponse);
  });

  it('customers of tenant -> return ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => testService.axiosECONNFailureExample));
    expect((await service.getCustomersOfTenant(100,0))).toMatchObject(testService.ECONNResponse);
  });

  it('customers of tenant -> test http error', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => testService.axiosFailureExample));
    expect((await service.getCustomersOfTenant(100,0))).toMatchObject(testService.FailResponse);
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('tenant infos -> should retrieve a list of tenants', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(testService.axiosTenantsSuccessExample));
    expect((await service.getTenantInfos(100,0))).toMatchObject(testService.SuccessResponse);
  });

  it('tenant infos -> ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => testService.axiosECONNFailureExample));
    expect((await service.getTenantInfos(100,0))).toMatchObject(testService.ECONNResponse);
  });

  it('tenant infos -> http error', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => testService.axiosFailureExample));
    expect((await service.getTenantInfos(100,0))).toMatchObject(testService.FailResponse);
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('tenant group info -> should retrieve tenant group info', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(testService.axiosTenantSuccessExample));
    expect((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15"))).toMatchObject(testService.SuccessResponse);
  });

  it('tenant group info -> ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => testService.axiosECONNFailureExample));
    expect((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15"))).toMatchObject(testService.ECONNResponse);
  });

  it('tenant group info -> HTTP ERROR', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => testService.axiosFailureExample));
    expect((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15"))).toMatchObject(testService.FailResponse);
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('update tenant -> should retrieve tenant group info', async () => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(testService.axiosTenantSuccessExample));
    expect((await service.updateTenant("12klj3", "reserve c", "asia", "1223vjhkmklasd", "Bora", "city", '1', '2', '1234', '1290348368457189023', 'l@b.com', {}))).toMatchObject(testService.SuccessResponse);
  });

  it('update tenant -> ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => testService.axiosECONNFailureExample));
    expect((await service.updateTenant("12klj3", "reserve c", "asia", "1223vjhkmklasd", "Bora", "city", '1', '2', '1234', '1290348368457189023', 'l@b.com', {}))).toMatchObject(testService.ECONNResponse);;
  });

  it('update tenant -> HTTP ERROR', async () => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => testService.axiosFailureExample));
    expect((await service.updateTenant("12klj3", "reserve c", "asia", "1223vjhkmklasd", "Bora", "city", '1', '2', '1234', '1290348368457189023', 'l@b.com', {}))).toMatchObject(testService.FailResponse);
  });
});
