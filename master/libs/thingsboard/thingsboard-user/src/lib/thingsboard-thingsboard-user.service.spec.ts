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

  it('login-> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.login(tests.user, tests.userPassword)).toMatchObject(tests.SuccessResponse);
  });

  it('login -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.login(tests.user, tests.userPassword)).toMatchObject(tests.ECONNResponse);
  });

  it('login -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.login(tests.user, tests.userPassword)).toMatchObject(tests.FailResponse);
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
  it('logout -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.logout(tests.tokenExample.token)).toMatchObject(tests.SuccessResponse);
  });

  it('logout -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.logout(tests.tokenExample.token)).toMatchObject(tests.ECONNResponse);
  });

  it('logout -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.logout(tests.tokenExample.token)).toMatchObject(tests.FailResponse);
  });

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
  it('user info -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.userInfo(tests.tokenExample.token)).toMatchObject(tests.SuccessResponse);
  });

  it('user info -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.userInfo(tests.tokenExample.token)).toMatchObject(tests.ECONNResponse);
  });

  it('user info -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.userInfo(tests.tokenExample.token)).toMatchObject(tests.FailResponse);
  });

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

  it('disable user -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.DisableUser(tests.tokenExample.token, "123456")).toMatchObject(tests.SuccessResponse);
  });

  it('disable user -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.DisableUser(tests.tokenExample.token, "123456")).toMatchObject(tests.ECONNResponse);
  });

  it('disable user -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.DisableUser(tests.tokenExample.token, "123456")).toMatchObject(tests.FailResponse);
  });


  /////////////////////////////////////////////////////////////////

  it('enable user -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.EnableUser(tests.tokenExample.token, "123456")).toMatchObject(tests.SuccessResponse);
  });

  it('enable user -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.EnableUser(tests.tokenExample.token, "123456")).toMatchObject(tests.ECONNResponse);
  });

  it('enable user -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.EnableUser(tests.tokenExample.token, "123456")).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////
  it('admin get customers -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    expect(await service.AdminGetCustomers(tests.tokenExample.token)).toMatchObject(tests.SuccessResponse);
  });

  it('admin get customers -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.AdminGetCustomers(tests.tokenExample.token)).toMatchObject(tests.ECONNResponse);
  });

  it('admin get customers -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.AdminGetCustomers(tests.tokenExample.token)).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////

  /* changeReserveForUser */
  it('change reserve for user -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.changeReserveForUser(
      'token',
      'Tid',
      'custID',
      'liamburgess299@gmail.com',
      'CUSTOMER_USER',
      'Liam',
      'Burgess',
      []
    )).toMatchObject(tests.SuccessResponse);
  });

  it('change reserve for user -> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.changeReserveForUser(
      'token',
      'Tid',
      'custID',
      'liamburgess299@gmail.com',
      'CUSTOMER_USER',
      'Liam',
      'Burgess',
      []
    )).toMatchObject(tests.ECONNResponse);
  });

  it('change reserve for user -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.changeReserveForUser(
      'token',
      'Tid',
      'custID',
      'liamburgess299@gmail.com',
      'CUSTOMER_USER',
      'Liam',
      'Burgess',
      []
    )).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////

  /* refresh token */
  it('refresh token -> return info', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.refreshToken(tests.tokenExample.refreshToken)).toMatchObject(tests.SuccessResponse);
  });

  it('refresh token-> ECONNREFUSED', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.refreshToken(tests.tokenExample.refreshToken)).toMatchObject(tests.ECONNResponse);
  });

  it('refresh token -> HTTP ERROR', async () => {
    //const Login = await service.login(tests.user, tests.userPassword);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.refreshToken(tests.tokenExample.refreshToken)).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////

});
