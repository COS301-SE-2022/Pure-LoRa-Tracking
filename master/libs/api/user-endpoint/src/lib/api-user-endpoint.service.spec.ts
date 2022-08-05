import { ApiApiTestingModule, ApiApiTestingService } from '@lora/api/testing';
import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { ApiUserEndpointService } from './api-user-endpoint.service';

describe('ApiUserEndpointService', () => {
  let service: ApiUserEndpointService;
  let tests: ApiApiTestingService;
  let tbClient: ThingsboardThingsboardClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ThingsboardThingsboardClientModule, ApiApiTestingModule],
      providers: [ApiUserEndpointService],
    }).compile();

    service = module.get(ApiUserEndpointService);
    tests = module.get(ApiApiTestingService);
    tbClient = module.get(ThingsboardThingsboardClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the users of the reserve', async () => {
    /*console.log(await service.AdminAllReserveUsersProcess({
      customerID:"ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3OTEwOTIsImV4cCI6MTY1NDgwMDA5Mn0.7J8AnYhPKPFUBoSe9WupzRTky5xaBFDZ5XHWdQ-wcLg8we8GKA06BOK9FuX8fDVrPVSeI654ZLD_7W1dASEHWA"
    }))*/
  });

  it("should change the user's reserve", async () => {
    /*console.log(await service.UserChangeReserveProcess({
      reserveID : "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      token : "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6IjU5MTAyZTgwLWY5MmQtMTFlYy1iOWQ5LWIzY2E3ZTQ5NzNhOCIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6InVzZXIiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiY2QyZGYyYjAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiY3VzdG9tZXJJZCI6ImVmNTVmZjQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU2NjczNTE4LCJleHAiOjE2NTY2ODI1MTh9.cVnkCbCQbvSKxhTuvwd9xRR0K21i701p2jKzJHjepTL8AKbaHRY8yq953wklwjI7wuwhhUISCTD4OATPyUu2Pg"
    }))*/
  });

  it('create user with reserve set', async () => {
    /*console.log(await service.AddUserProcess({
      customerID: '427430f0-0845-11ed-bc6e-a50062f6cdba',
      reserves: [
        { reserveID: '427430f0-0845-11ed-bc6e-a50062f6cdba', reserveName: 'tuks' },
        { reserveID: 'a0436390-0845-11ed-bc6e-a50062f6cdba', reserveName: 'Rietvlei' },
      ],
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImY3NGNiZjMwLTA4M2UtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImVjODY0MzUwLTA4M2UtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY1ODQ4MjU0NSwiZXhwIjoxNjU4NDkxNTQ1fQ.9SjFxAongejI5VqEiWw-uZgid079KRrCq8E7aVO95FY0cYgBdAqs6DqOF5Ch2-PTtWcxbNGRvXonL1PtqVxPcw',
      userInfo: { email: 'reserveuserfour@reserve.com', firstName: 'jack', lastName: 'Johns' },
    }))*/
  });

  it("get user info", async () => {
    // console.log(
    //   (await service.UserInfoProcess({token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlcnR3b0ByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImQ4ZDRiZjMwLTA3NzYtMTFlZC1iMWU0LWVkZDUzMjRhY2YwNSIsImZpcnN0TmFtZSI6InJlc2VydmUgdXNlciB0d28iLCJsYXN0TmFtZSI6InJlc2VydmUiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiY2QyZGYyYjAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiY3VzdG9tZXJJZCI6IjRiY2VjZTQwLWUxZDktMTFlYy1hOWI2LWJiYjliYWQzZGYzOSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU4MjQ0MzEwLCJleHAiOjE2NTgyNTMzMTB9.ZvlY6mW8DKBJrp9oF6Adki6ZsWzvxasDVu1KKC0RZYtWojlekkwydn4w6dyX57gG_R3bI5XJPQKwVHfReHS03Q'})).data.additionalInfo
    // )
  });

  /*it('assign device -> assign fail', async () => {
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
    .spyOn(httpService, 'post')
    .mockImplementationOnce(() =>
      throwError(() => tests.axiosECONNFailureExample)
    );
    expect(await service.assignDeviceToReserve('a','b')).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  }); */

  it('add user -> missing token', async () => {
    delete tests.userEndpointExample.token;
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });

    tests.userEndpointExample.token = '';
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });
  });

  it('add user -> missing customer ID', async () => {
    delete tests.userEndpointExample.customerID;
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'customerID not defined',
    });

    tests.userEndpointExample.customerID = '';
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'customerID not defined',
    });
  });

  it('add user -> missing userinfo', async () => {
    delete tests.userEndpointExample.userInfo;
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userInfo not defined',
    });
  });

  it('add user -> missing email', async () => {
    delete tests.userEndpointExample.userInfo.email;
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no user email found',
    });

    tests.userEndpointExample.userInfo.email = '';
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no user email found',
    });
  });

  it('add user -> missing first name', async () => {
    delete tests.userEndpointExample.userInfo.firstName;
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no first name found',
    });

    tests.userEndpointExample.userInfo.firstName = '';
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no first name found',
    });
  });

  it('add user -> missing last name', async () => {
    delete tests.userEndpointExample.userInfo.lastName;
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no last name found',
    });

    tests.userEndpointExample.userInfo.lastName = '';
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no last name found',
    });
  });

  it('add user -> missing reserve', async () => {
    delete tests.userEndpointExample.reserves;
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no reserves found, there must at least be one'
    });

    tests.userEndpointExample.reserves = [];
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'no reserves found, there must at least be one'
    });
  });

  it('add user -> user added to reserve', async () => {
    jest
    .spyOn(tbClient, 'addUserToReserve')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
  }); 

  it('add user -> fail user added to reserve', async () => {
    jest
    .spyOn(tbClient, 'addUserToReserve')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    expect(await service.AddUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
  });

  ///////////////////////////////////////////////////////////////////////////////////
  it('change reserve -> missing token', async () => {
    delete tests.userEndpointExample.token;
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });

    tests.userEndpointExample.token = '';
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });
  });

  it('change reserve -> missing refreshToken', async () => {
    delete tests.userEndpointExample.refreshToken;
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'refreshToken not defined',
    });

    tests.userEndpointExample.refreshToken = '';
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'refreshToken not defined',
    });
  });

  it('change reserve -> missing reserveID', async () => {
    delete tests.userEndpointExample.reserveID;
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'reserveID not defined',
    });

    tests.userEndpointExample.reserveID = '';
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'reserveID not defined',
    });
  });

  it('change reserve -> pass', async () => {
    jest
    .spyOn(tbClient, 'changeReserveForUser')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    jest
    .spyOn(tbClient, 'refresh')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished", token:"12", refreshToken:'123'}));
    delete tests.tbSuccess.explain;
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
  }); 

  it('change reserve -> fail', async () => {
    jest
    .spyOn(tbClient, 'changeReserveForUser')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    jest
    .spyOn(tbClient, 'refresh')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished", token:"12", refreshToken:'123'}));
    tests.tbFail.explain = 'Server failed with: ECONNREFUSED'
    expect(await service.UserChangeReserveProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
  });

  ///////////////////////////////////////////////////////////////////////////////////
  it('remove user -> missing token', async () => {
    delete tests.userEndpointExample.token;
    expect(await service.RemoveUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });

    tests.userEndpointExample.token = '';
    expect(await service.RemoveUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });
  });

  it('remove user -> missing user id', async () => {
    delete tests.userEndpointExample.userID;
    expect(await service.RemoveUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });

    tests.userEndpointExample.userID = '';
    expect(await service.RemoveUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });
  });

  it('remove user -> fail', async () => {
    jest
    .spyOn(tbClient, 'removeReserveUser')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    expect(await service.RemoveUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
  });

  it('remove user -> pass', async () => {
    jest
    .spyOn(tbClient, 'removeReserveUser')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccess.explain = 'ok'
    expect(await service.RemoveUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
  });

  ///////////////////////////////////////////////////////////////////////////////////
  it('disable user -> missing token', async () => {
    delete tests.userEndpointExample.token;
    expect(await service.DisableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });

    tests.userEndpointExample.token = '';
    expect(await service.DisableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });
  });

  it('disable user -> missing user id', async () => {
    delete tests.userEndpointExample.userID;
    expect(await service.DisableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });

    tests.userEndpointExample.userID = '';
    expect(await service.DisableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });
  });

  it('disable user -> pass', async () => {
    jest
    .spyOn(tbClient, 'disableUser')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccess.explain = 'ok'
    expect(await service.DisableUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
  });

  it('disable user -> fail', async () => {
    jest
    .spyOn(tbClient, 'disableUser')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbSuccess.explain = 'ok'
    expect(await service.DisableUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
  });

  ///////////////////////////////////////////////////////////////////////////////////
  it('enable user -> missing token', async () => {
    delete tests.userEndpointExample.token;
    expect(await service.EnableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });

    tests.userEndpointExample.token = '';
    expect(await service.EnableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });
  });

  it('enable user -> missing user id', async () => {
    delete tests.userEndpointExample.userID;
    expect(await service.EnableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });

    tests.userEndpointExample.userID = '';
    expect(await service.EnableUserProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });
  });

  it('enable user -> pass', async () => {
    jest
    .spyOn(tbClient, 'enableUser')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccess.explain = 'ok'
    expect(await service.EnableUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
  });

  it('enable user -> fail', async () => {
    jest
    .spyOn(tbClient, 'enableUser')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbSuccess.explain = 'ok'
    expect(await service.EnableUserProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
  });

  ///////////////////////////////////////////////////////////////////////////////////
  it('user info -> missing token', async () => {
    delete tests.userEndpointExample.token;
    expect(await service.UserInfoProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });

    tests.userEndpointExample.token = '';
    expect(await service.UserInfoProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });
  });

  it('user info -> pass', async () => {
    jest
    .spyOn(tbClient, 'getUserInfoByID')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    expect(await service.UserInfoProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
    tests.tbSuccess.explain = 'call finished'
    delete tests.userEndpointExample.userID;

    jest
    .spyOn(tbClient, 'getUserInfoFromToken')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    expect(await service.UserInfoProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
  });

  it('user info -> fail', async () => {
    jest
    .spyOn(tbClient, 'getUserInfoByID')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    expect(await service.UserInfoProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
    tests.tbSuccess.explain = 'call finished'
    delete tests.userEndpointExample.userID;

    jest
    .spyOn(tbClient, 'getUserInfoFromToken')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    expect(await service.UserInfoProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
  });
  ///////////////////////////////////////////////////////////////////////////////////
  it('update user -> missing token', async () => {
    delete tests.userEndpointExample.token;
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });

    tests.userEndpointExample.token = '';
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject({
      status: 401,
      explain: 'token missing',
    });
  });

  it('update user -> missing user id', async () => {
    delete tests.userEndpointExample.userID;
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });

    tests.userEndpointExample.userID = '';
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'userID not defined',
    });
  });

  it('update user -> missing firstname', async () => {
    delete tests.userEndpointExample.userInfo.firstName;
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'firstname not defined',
    });

    tests.userEndpointExample.userInfo.firstName = '';
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject({
      status: 400,
      explain: 'firstname not defined',
    });
  });

  it('update user -> fail', async () => {
    jest
    .spyOn(tbClient, 'updateUser')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbSuccess.explain = 'ok'
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject(tests.tbFail)
  });

  it('update user -> pass', async () => {
    jest
    .spyOn(tbClient, 'updateUser')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    expect(await service.UserInfoUpdateProcess(tests.userEndpointExample)).toMatchObject(tests.tbSuccess)
  });
});
