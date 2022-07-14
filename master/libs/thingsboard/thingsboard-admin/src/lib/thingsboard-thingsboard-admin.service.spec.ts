//import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardAdminService } from './thingsboard-thingsboard-admin.service';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';

describe('ThingsboardThingsboardAdminService', () => {
  let service: ThingsboardThingsboardAdminService;
  let httpService: HttpService;
  let userService : ThingsboardThingsboardUserService;
  const CustomerExample = {
    "externalId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "CUSTOMER"
    },
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "CUSTOMER"
    },
    "createdTime": 1609459200000,
    "title": "Company A",
    "name": "Company A",
    "tenantId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT"
    },
    "country": "US",
    "state": "NY",
    "city": "New York",
    "address": "42 Broadway Suite 12-400",
    "address2": "string",
    "zip": "10004",
    "phone": "+1(415)777-7777",
    "email": "example@company.com",
    "additionalInfo": {}
  }
  const CustomersExample = {
    "data": [
      {
        "externalId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "CUSTOMER"
        },
        "id": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "CUSTOMER"
        },
        "createdTime": 1609459200000,
        "title": "Company A",
        "name": "Company A",
        "tenantId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT"
        },
        "country": "US",
        "state": "NY",
        "city": "New York",
        "address": "42 Broadway Suite 12-400",
        "address2": "string",
        "zip": "10004",
        "phone": "+1(415)777-7777",
        "email": "example@company.com",
        "additionalInfo": {}
      }
    ],
    "totalPages": 0,
    "totalElements": 0,
    "hasNext": false
  }

  const TenantsExample = {
    "data": [
      {
        "id": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT"
        },
        "createdTime": 1609459200000,
        "title": "Company A",
        "name": "Company A",
        "region": "North America",
        "tenantProfileId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT_PROFILE"
        },
        "country": "US",
        "state": "NY",
        "city": "New York",
        "address": "42 Broadway Suite 12-400",
        "address2": "string",
        "zip": "10004",
        "phone": "+1(415)777-7777",
        "email": "example@company.com",
        "additionalInfo": {},
        "tenantProfileName": "Default"
      }
    ],
    "totalPages": 0,
    "totalElements": 0,
    "hasNext": false
  }

  const TenantExample = {
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT"
    },
    "createdTime": 1609459200000,
    "title": "Company A",
    "name": "Company A",
    "region": "North America",
    "tenantProfileId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT_PROFILE"
    },
    "country": "US",
    "state": "NY",
    "city": "New York",
    "address": "42 Broadway Suite 12-400",
    "address2": "string",
    "zip": "10004",
    "phone": "+1(415)777-7777",
    "email": "example@company.com",
    "additionalInfo": {},
    "tenantProfileName": "Default"
  }

  const tokenExample = {
    token:"we12nklJQW",
    refreshToken:"w3hjkqlbdwejkdn89"
  }
  let axiosCustomerSuccessExample : AxiosResponse<unknown>
  let axiosCustomersSuccessExample : AxiosResponse<unknown>
  let axiosTenantSuccessExample : AxiosResponse<unknown>
  let axiosTenantsSuccessExample : AxiosResponse<unknown>
  let axiosTokenSuccessExample : AxiosResponse<unknown>
  let axiosFailureExample;
  let axiosECONNFailureExample;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardAdminService],
      imports : [HttpModule,ThingsboardThingsboardUserModule]
    }).compile();

    service = module.get(ThingsboardThingsboardAdminService);
    httpService = module.get(HttpService);
    userService = module.get(ThingsboardThingsboardUserService);

    axiosTenantSuccessExample = {
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
      data : TenantExample
    }

    axiosTenantsSuccessExample = {
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
      data : TenantsExample
    }


    axiosCustomerSuccessExample = {
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
      data : CustomerExample
    }

    axiosCustomersSuccessExample = {
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
      data : CustomersExample
    }

    axiosFailureExample = {
      response : {
        data : {
          message : "Not Authorized"
        },
        status : 400,
      }
    }

    axiosECONNFailureExample = {
      code : "ECONNREFUSED"
    }

    axiosTokenSuccessExample = {
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
      data : tokenExample
    }

  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('customers of tenant -> should retrieve a list of customers that are owned by the tenant', async () => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(axiosTokenSuccessExample));
    const Login = await userService.login("reserveadmin@reserve.com", "reserve");
    service.setToken(Login.data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(axiosCustomersSuccessExample));
    expect((await service.getCustomersOfTenant(100,0))).toBeDefined();
  });

  it('customers of tenant -> return ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosECONNFailureExample));
    console.table((await service.getCustomersOfTenant(100,0)));
  });

  it('customers of tenant -> test http error', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosFailureExample));
    console.table((await service.getCustomersOfTenant(100,0)));
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('tenant infos -> should retrieve a list of tenants', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(axiosTenantsSuccessExample));
    console.table((await service.getTenantInfos(100,0)).data[0]);
  });

  it('tenant infos -> ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosECONNFailureExample));
    console.table((await service.getTenantInfos(100,0)));
  });

  it('tenant infos -> http error', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosFailureExample));
    console.table((await service.getTenantInfos(100,0)));
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('tenant group info -> should retrieve tenant group info', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(axiosTenantSuccessExample));
    console.table((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15")).data.additionalInfo);
  });

  it('tenant group info -> ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosECONNFailureExample));
    console.table((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15")));
  });

  it('tenant group info -> HTTP ERROR', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosFailureExample));
    console.table((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15")));
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('tenant group info -> should retrieve tenant group info', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(axiosTenantSuccessExample));
    console.table((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15")).data.additionalInfo);
  });

  it('tenant group info -> ECONNREFUSED', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosECONNFailureExample));
    console.table((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15")));
  });

  it('tenant group info -> HTTP ERROR', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => axiosFailureExample));
    console.table((await service.getTenantGroupInfo("7d4c0eb0-ffb6-11ec-971b-3fcc7eafec15")));
  });
});
