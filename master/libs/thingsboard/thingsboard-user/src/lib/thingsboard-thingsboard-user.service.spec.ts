import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardUserService } from './thingsboard-thingsboard-user.service';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardTestsModule, ThingsboardThingsboardTestsService } from "@lora/thingsboard/tests";

describe('ThingsboardThingsboardUserService', () => {
  let service: ThingsboardThingsboardUserService;
  let httpService: HttpService;
  let tests: ThingsboardThingsboardTestsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardUserService],
      imports: [HttpModule, ThingsboardThingsboardTestsModule],
    }).compile();

    service = module.get(ThingsboardThingsboardUserService);
    httpService = module.get(HttpService);
    tests = module.get(ThingsboardThingsboardTestsService)
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  /////////////////////////////////////////////////////////////////

 /* it('valid login should return token and refreshToken', async () => {
    const result: AxiosResponse<any> = {
      data: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const login = await service.login('reserveAdmin@reserve.com', 'reserve');
    expect(login['data']['token']).toBeDefined;
  });*/

  /////////////////////////////////////////////////////////////////

 /* it('should logout and return status 200 - OK', async () => {
    const result: AxiosResponse<any> = {
      data: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const login = await service.login(username, password);

    result.data = {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
    };

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const logout = await service.logout(login['data']['token']);
    expect(logout['status']).toEqual(200);
  });*/

  /////////////////////////////////////////////////////////////////

  /*it('Should print user info', async () => {
    const result: AxiosResponse<any> = {
      data: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const login = await service.login(username, password);

    result.data = {
      id: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'USER',
      },
      createdTime: 1609459200000,
      tenantId: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'TENANT',
      },
      customerId: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'CUSTOMER',
      },
      email: 'reserveuser@reserve.com',
      name: 'reserveuser@reserve.com',
      authority: 'TENANT_ADMIN',
      firstName: 'John',
      lastName: 'Doe',
      additionalInfo: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const userInfo = await service.userInfo(login['data']['token']);
    expect(userInfo['data']['customerId']['id']).toBeDefined();
  });*/

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  it('customer info -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.userInfoByUserID(tests.tokenExample.token, "123456")).toMatchObject(tests.SuccessResponse);
  });

  it('customer info -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.userInfoByUserID(tests.tokenExample.token, "123456")).toMatchObject(tests.ECONNResponse);
  });

  it('customer info -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.userInfoByUserID(tests.tokenExample.token, "123456")).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////

  it('users of reserve -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.GetUsersFromReserve(tests.tokenExample.token, "123456")).toMatchObject(tests.SuccessResponse);
  });

  it('users of reserve -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.GetUsersFromReserve(tests.tokenExample.token, "123456")).toMatchObject(tests.ECONNResponse);
  });

  it('users of reserve -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.GetUsersFromReserve(tests.tokenExample.token, "123456")).toMatchObject(tests.FailResponse);
  });
  /////////////////////////////////////////////////////////////////

  it('should create the user -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.createReserveUser(
      'token',
      'custID',
      'liamburgess299@gmail.com',
      'CUSTOMER_USER',
      'Liam',
      'Burgess',
      []
    )).toMatchObject(tests.SuccessResponse);
  });

  it('should create the user -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.createReserveUser(
      'token',
      'custID',
      'liamburgess299@gmail.com',
      'CUSTOMER_USER',
      'Liam',
      'Burgess',
      []
    )).toMatchObject(tests.ECONNResponse);
  });

  it('should create the user -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.createReserveUser(
      'token',
      'custID',
      'liamburgess299@gmail.com',
      'CUSTOMER_USER',
      'Liam',
      'Burgess',
      []
    )).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////

  it('delete user -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.deleteUser(tests.tokenExample.token, "123456")).toMatchObject(tests.SuccessResponse);
  });

  it('delete user -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.deleteUser(tests.tokenExample.token, "123456")).toMatchObject(tests.ECONNResponse);
  });

  it('delete user -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.deleteUser(tests.tokenExample.token, "123456")).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////

  it('should disable the reserve user', async () => {
    /*const Login = await service.login(username, password);
    console.log(await service.DisableUser(Login["data"]["token"], "f96e60d0-dfe8-11ec-bdb3-750ce7ed2451"));*/
  });

  /////////////////////////////////////////////////////////////////

  it('should enable the reserve user', async () => {
    /*const Login = await service.login(username, password);
    console.log(await service.EnableUser(Login["data"]["token"], "f96e60d0-dfe8-11ec-bdb3-750ce7ed2451"));*/
  });

  /////////////////////////////////////////////////////////////////

  it('should get the reserve users', async () => {
    //console.log(await service.GetUsersFromReserve("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3OTEwOTIsImV4cCI6MTY1NDgwMDA5Mn0.7J8AnYhPKPFUBoSe9WupzRTky5xaBFDZ5XHWdQ-wcLg8we8GKA06BOK9FuX8fDVrPVSeI654ZLD_7W1dASEHWA", "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451"));
    //console.log(await service.refreshToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTUxMjcxMjksImV4cCI6MTY1NTEzNjEyOX0.bnlLAsb6BHA0_2wl5VQrsTf3el1rsdZdyylcpZG-97GJ3g0e5Bom8BNzvAtrIPoQkzYApg7UrbHTWCG715v3Gg"));
  });

  it('should create the user with the reserve set given', async () => {
    return true;
  });
});
