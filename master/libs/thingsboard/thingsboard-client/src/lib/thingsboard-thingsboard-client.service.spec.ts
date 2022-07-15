import { ThingsboardThingsboardAssetModule } from '@lora/thingsboard-asset';
import { ThingsboardThingsboardDeviceModule } from '@lora/thingsboard-device';
import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardAdminModule } from '@lora/thingsboard/admin';
import { ThingsboardThingsboardReserveModule } from '@lora/thingsboard/reserve';
import { ThingsboardThingsboardTestsModule, ThingsboardThingsboardTestsService } from '@lora/thingsboard/tests';
import { ThingsboardThingsboardClientModule } from './thingsboard-thingsboard-client.module';

describe('ThingsboardThingsboardClientService', () => {
  let service: ThingsboardThingsboardClientService;
  let httpService: HttpService;
  let tests: ThingsboardThingsboardTestsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardClientService],
      imports: [
        ThingsboardThingsboardUserModule,
        ThingsboardThingsboardTelemetryModule,
        ThingsboardThingsboardDeviceModule,
        ThingsboardThingsboardAssetModule,
        ThingsboardThingsboardAdminModule,
        ThingsboardThingsboardReserveModule,
        ThingsboardThingsboardTestsModule
      ],
    }).compile();

    service = module.get(ThingsboardThingsboardClientService);
    httpService = module.get(HttpService);
    tests = module.get(ThingsboardThingsboardTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

//////////////////////////////////////////////////////////////////////////////////////////
/*
it(' -> ', async () => {
  jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
  expect((await service.())).toMatchObject(Object.assign(tests.TBSuccessResponse, {Token:"we12nklJQW", refreshToken:"w3hjkqlbdwejkdn89"}));
});

it(' -> ECONNREFUSED', async () => {
  jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
  expect((await service.())).toMatchObject(tests.TBFailureResponse);
});

it(' -> HTTP ERROR', async () => {
  jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
  expect((await service.())).toMatchObject(tests.TBFailureResponse);
});

*/

//////////////////////////////////////////////////////////////////////////////////////////
it('login -> pass', async () => {
  jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
  expect((await service.loginUser(tests.user, tests.userPassword))).toEqual(true);
});

it('login -> fail', async () => {
  jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
  expect((await service.loginUser(tests.user, tests.userPassword))).toEqual(false);
});

//////////////////////////////////////////////////////////////////////////////////////////
it('login user -> return token', async () => {
  jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
  expect((await service.loginUserReturnToken(tests.user, tests.userPassword))).toMatchObject(Object.assign(tests.TBSuccessResponse, {Token:"we12nklJQW", refreshToken:"w3hjkqlbdwejkdn89"}));
});

it('login user -> HTTP ERROR', async () => {
  jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
  expect((await service.loginUserReturnToken(tests.user, tests.userPassword))).toMatchObject(tests.TBFailureResponse);
});

//////////////////////////////////////////////////////////////////////////////////////////

it('refresh token login -> return token', async () => {
  jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
  const obj = Object.assign(tests.TBSuccessResponse, {data:{token:"we12nklJQW", refreshToken:"w3hjkqlbdwejkdn89"}})
  expect((await service.loginFromRefreshToken("1"))).toMatchObject(obj);
});

it('refresh token login -> HTTP ERROR', async () => {
  jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
  expect((await service.loginFromRefreshToken("1"))).toMatchObject(tests.TBFailureResponse);
});

//////////////////////////////////////////////////////////////////////////////////////////
it('get token-> return token', async () => {
  jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
  expect((await service.getToken(tests.user, tests.userPassword))).toMatchObject(Object.assign({status:200}, {data:{token:"we12nklJQW", refreshToken:"w3hjkqlbdwejkdn89"}}));
});

//////////////////////////////////////////////////////////////////////////////////////////

  it('get user devices -> return info', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect((await service.getCustomerDevices("1"))).toMatchObject(Object.assign(tests.TBSuccessResponse, {data:[{"deviceID": "784f394c-42b6-435a-983c-b7beff2784f9",
           "deviceName": "A4B72CCDFF33",
           "humanName": "Room 234 Sensor",
           "isGateway": undefined,
          "profile": "DEVICE"}]}));
  });

  it('get user devices -> HTTP ERROR', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect((await service.getCustomerDevices("1"))).toMatchObject(Object.assign(tests.TBFailureResponse,{data:[]}));
  });

//////////////////////////////////////////////////////////////////////////////////////////
it('test token setter -> value set', async () => {
  service.setToken("123");
  expect(service.getPrivateToken()).toEqual("123")
});

//////////////////////////////////////////////////////////////////////////////////////////

  it('should return the reserve perimeter for the reserve user', async () => {
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
    await service.loginUser('username', 'password');

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
    /*
      TODO
      Fix test,
      somewhere along the line it actually tries to connect to thingsboard
    */
    // expect(await service.getReservePerimeter()).toBeDefined();
  });

  it('should return the telemetry for the deviceID given', async () => {
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
    await service.loginUser('username', 'password');

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
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    //console.log(await service.getDeviceHistoricalData("25c31a40-dfe9-11ec-bdb3-750ce7ed2451", 0, 1654072587463));
    expect(
      await service.getDeviceHistoricalData(
        '25c31a40-dfe9-11ec-bdb3-750ce7ed2451',
        0,
        1654072587463
      )
    ).toBeDefined();
  });

  it('should return the customer devices by filter', async () => {
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
    expect(await service.loginUser('username', 'password')).toBe(true);

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
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

    const secondResult = {
      data: {
        data: [
          {
            id: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'DEVICE',
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
            name: 'A4B72CCDFF33',
            type: 'Temperature Sensor',
            label: 'Room 234 Sensor',
            deviceProfileId: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'DEVICE_PROFILE',
            },
            deviceData: {
              configuration: {},
              transportConfiguration: {},
            },
            firmwareId: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'OTA_PACKAGE',
            },
            softwareId: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'OTA_PACKAGE',
            },
            additionalInfo: {},
            customerTitle: 'string',
            customerIsPublic: false,
            deviceProfileName: 'string',
          },
        ],
        totalPages: 0,
        totalElements: 0,
        hasNext: false,
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(secondResult));
    const deviceInfos = await service.getDeviceInfos([
      '25c31a40-dfe9-11ec-bdb3-750ce7ed2451',
    ]);
    console.log(deviceInfos);
    expect(deviceInfos).toBeDefined();
  });

  //////////////////////////////////////////////////////////////////////
  it('should create and assign the device', async () => {
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

    const secondResult: AxiosResponse<any> = {
      data: {
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
        email: 'user@example.com',
        name: 'user@example.com',
        authority: 'TENANT_ADMIN',
        firstName: 'John',
        lastName: 'Doe',
        additionalInfo: {},
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    const thirdResult: AxiosResponse<any> = {
      data: {
        id: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'CUSTOMER',
        },
        createdTime: 1609459200000,
        title: 'Company A',
        name: 'Company A',
        tenantId: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'TENANT',
        },
        country: 'US',
        state: 'NY',
        city: 'New York',
        address: '42 Broadway Suite 12-400',
        address2: 'string',
        zip: '10004',
        phone: '+1(415)777-7777',
        email: 'example@company.com',
        additionalInfo: {},
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };
    const fourthResult: AxiosResponse<any> = {
      data: {
        id: {
          id: 'ef55ff40-dfe8-11ec-bdb3-750ce7ed2451',
          entityType: 'DEVICE',
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
        name: 'mc544',
        type: 'Temperature Sensor',
        label: 'Giraffe',
        deviceProfileId: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'DEVICE_PROFILE',
        },
        deviceData: {
          configuration: {},
          transportConfiguration: {},
        },
        firmwareId: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'OTA_PACKAGE',
        },
        softwareId: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'OTA_PACKAGE',
        },
        additionalInfo: {},
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    expect(await service.loginUser('username', 'password')).toBe(true);

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(secondResult));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(thirdResult));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(fourthResult));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(fourthResult));

      jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(fourthResult));

    const resp = await service.addDeviceToReserve(
      'ef55ff40-dfe8-11ec-bdb3-750ce7ed2451',
      {
        hardwareID: 'mc544',
        isGateway: false,
        labelName: 'Giraffe',
      }
    );
    console.log(resp);
    // expect(resp).toEqual({
    //   status: 'ok',
    //   data: 'ef55ff40-dfe8-11ec-bdb3-750ce7ed2451',
    //   explanation : undefined
    // });
    //TODO check for deep equality of the object
    expect(resp.status).toEqual("fail");
  });

  it('should unassign a given device from the specified reserve', async () => {
    /*const result: AxiosResponse<any> = {
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

    const secondResult: AxiosResponse<any> = {
      data: {
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
        email: 'user@example.com',
        name: 'user@example.com',
        authority: 'TENANT_ADMIN',
        firstName: 'John',
        lastName: 'Doe',
        additionalInfo: {},
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    const thirdResult: AxiosResponse<any> = {
      data: {},
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    expect(await service.loginUser(username, password)).toBe(false);

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(secondResult));
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() => of(thirdResult));

    const resp = await service.RemoveDeviceFromReserve(
      'a7971100-e581-11ec-a9e5-f30a5c07bcf3'
    );
    console.log(resp);
    expect(resp).toEqual({ status: 'fail', explanation: 'wrong permissions' });

    //////////////////////////////////////////////////////////////////////

    //it('should create and assign the device', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
        true
      );
      console.log(await service.RemoveDeviceFromReserve("a7971100-e581-11ec-a9e5-f30a5c07bcf3"))*/
  });

  //////////////////////////////////////////////////////////////////////

  it('should create and assign the user the user to the reserve', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.addUserToReserve("ef55ff40-dfe8-11ec-bdb3-750ce7ed2451", "lb@g.com","l", "b"));*/
  });

  //////////////////////////////////////////////////////////////////////

  it('should remove the user from the reserve', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/
  });

  //////////////////////////////////////////////////////////////////////

  it('should send the telemetry and receive an ok response', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/

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

    expect(
      await service.v1SendTelemetry('sadfj-assen-12xed-esawf', { rssi: 2000 })
    ).toEqual({ status: 200, explanation: 'call finished' });
  });

  //////////////////////////////////////////////////////////////////////

  it('should set the gateway location', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.setGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451", [{latitude:22,longitude:24}]));*/
  });

  //////////////////////////////////////////////////////////////////////

  it('should get the gateway location', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.getGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451"));*/
  });

  //////////////////////////////////////////////////////////////////////

  it('should get the customers for the admin', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.AdminGetCustomers());*/
  });

  //////////////////////////////////////////////////////////////////////

  it('device infos', async () => {
    /*expect(await service.loginUser('reserveuser@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.getDeviceInfos(["2fe67850-dfe9-11ec-bdb3-750ce7ed2451"]));*/
  });

  //////////////////////////////////////////////////////////////////////

  it('customer devices', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.getCustomerDevices("ef55ff40-dfe8-11ec-bdb3-750ce7ed2451"));
  });*/

  });

  //////////////////////////////////////////////////////////////////////

  it('build reserve list -> not system admin', async () => {
   /* await service.loginUser('reserve@thingsboard.org', 'thingsboardserveraccountissecure')

    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
     status : 'fail',
     explanation: 'user not system admin'
    })*/

  });

  //////////////////////////////////////////////////////////////////////

  it('build reserve list -> not system admin', async () => {
    /*await service.loginUser('serv@thingsboard.org', 'thingsboardserveraccountissecure')

    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
     status : 'ok',
     explanation: 'call finished'
    })*/

  });

  //////////////////////////////////////////////////////////////////////

  it('build reserve list -> build system admin list', async () => {
    /*await service.loginUser('server@thingsboard.org', 'thingsboardserveraccountissecure')

    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
     status : 'ok',
     explanation: 'call finished'
    })*/

  });

  //////////////////////////////////////////////////////////////////////

  it('build reserve list -> not reserve admin', async () => {
    /*expect(await service.loginUser('reserveuser@reserve.com', 'reserve')).toEqual(true);

    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
     status : 'fail',
     explanation: 'user not reserve admin'
    })*/
  });
  //////////////////////////////////////////////////////////////////////

  it('build reserve list -> build reserve admin list', async () => {
   /* expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toEqual(true);

    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
     status : 'ok',
     explanation: 'call finished'
    })*/
  });

  //////////////////////////////////////////////////////////////////////

  it('create reserve group -> not admin', async () => {
   /* expect(await service.loginUser('reserveuser@reserve.com', 'reserve')).toEqual(true);

    expect(await service.createReserve("liamburgesss299@gmail.com", "reserve b")).toMatchObject({
     status : 'fail',
     explanation: 'user is not an admin'
    })*/
  });

  //////////////////////////////////////////////////////////////////////

  it('create reserve group -> create group and fail attempt to recreate', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toEqual(true);

    expect(await service.createReserve("liamburgesss299@gmail.com", "reserve b")).toMatchObject({
     status : 'ok',
    })

    expect(await service.createReserve("liamburgesss299@gmail.com", "reserve b")).toMatchObject({
      status : 'fail',
     })*/
  });

  //////////////////////////////////////////////////////////////////////

  it('update reserve perimeter -> wrong permission', async () => {
    /*expect(await service.loginUser('reserveuser@reserve.com', 'reserve')).toEqual(true);

    expect(await service.updateReservePerimeter('8e3d4250-0297-11ed-ac9e-bb12f95a3e82', {
      coordinates : [
        {latitude:1, longitude:2},
        {latitude:4, longitude:4}
      ],
      center : {
        longitude:34,
        latitude:23
      }
    })).toMatchObject({
      status:'fail',
      explanation:'wrong permissions'
    })*/
  });

  //////////////////////////////////////////////////////////////////////

  it('update reserve perimeter -> update perimeter', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toEqual(true);

    expect(await service.updateReservePerimeter('8e3d4250-0297-11ed-ac9e-bb12f95a3e82', {
      coordinates : [
        {latitude:1, longitude:2},
        {latitude:4, longitude:4}
      ],
      center : {
        longitude:34,
        latitude:23
      }
    })).toMatchObject({
      status:'ok',
      explanation:'call finished'
    })*/
  });

  //////////////////////////////////////////////////////////////////////

  it('reserve group info', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toEqual(true);

    expect(await service.CustomerInfo('8e3d4250-0297-11ed-ac9e-bb12f95a3e82')).toMatchObject({
      status:'ok',
      explanation:'call finished'
    })*/
    
  });

  //////////////////////////////////////////////////////////////////////

  it('reserve group delete', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toEqual(true);

    expect(await service.deleteReserve('9700a190-029f-11ed-ac9e-bb12f95a3e82')).toMatchObject({
      status:'ok',
      explanation:'call finished'
    })*/
    
  });

})

