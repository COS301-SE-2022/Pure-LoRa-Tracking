import { ThingsboardThingsboardAssetModule } from '@lora/thingsboard-asset';
import { ThingsboardThingsboardDeviceModule } from '@lora/thingsboard-device';
import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardUserModule } from '@lora/thingsboard-user';
import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardAdminModule } from '@lora/thingsboard/admin';
import { ThingsboardThingsboardReserveModule } from '@lora/thingsboard/reserve';
import {
  ThingsboardThingsboardTestsModule,
  ThingsboardThingsboardTestsService,
} from '@lora/thingsboard/tests';

describe('ThingsboardThingsboardClientService', () => {
  let service: ThingsboardThingsboardClientService;
  let httpService: HttpService;
  let tests: ThingsboardThingsboardTestsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardClientService],
      imports: [
        ThingsboardThingsboardUserModule,
        ThingsboardThingsboardTelemetryModule,
        ThingsboardThingsboardDeviceModule,
        ThingsboardThingsboardAssetModule,
        ThingsboardThingsboardAdminModule,
        ThingsboardThingsboardReserveModule,
        ThingsboardThingsboardTestsModule,
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
  expect((await service.())).toMatchObject({...tests.TBSuccessResponse, ...{}});
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
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.loginUser(tests.user, tests.userPassword)).toEqual(
      true
    );
  });

  it('login -> fail', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.loginUser(tests.user, tests.userPassword)).toEqual(
      false
    );
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('login user -> return token', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(
      await service.loginUserReturnToken(tests.user, tests.userPassword)
    ).toMatchObject({
      ...tests.TBSuccessResponse,
      ...{ Token: 'we12nklJQW', refreshToken: 'w3hjkqlbdwejkdn89' },
    });
  });

  it('login user -> HTTP ERROR', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.loginUserReturnToken(tests.user, tests.userPassword)
    ).toMatchObject(tests.TBFailureResponse);
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('refresh token login -> return token', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    const obj = Object.assign({
      ...tests.TBSuccessResponse,
      ...{ data: { token: 'we12nklJQW', refreshToken: 'w3hjkqlbdwejkdn89' } },
    });
    expect(await service.loginFromRefreshToken('1')).toMatchObject(obj);
  });

  it('refresh token login -> HTTP ERROR', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.loginFromRefreshToken('1')).toMatchObject(
      tests.TBFailureResponse
    );
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('get token-> return token', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(
      await service.getToken(tests.user, tests.userPassword)
    ).toMatchObject({
      ...{ status: 200 },
      ...{ data: { token: 'we12nklJQW', refreshToken: 'w3hjkqlbdwejkdn89' } },
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('get user devices -> return info', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect(await service.getCustomerDevices('1')).toMatchObject({
      ...tests.TBSuccessResponse,
      ...{
        data: [
          {
            deviceID: '784f394c-42b6-435a-983c-b7beff2784f9',
            deviceName: 'A4B72CCDFF33',
            humanName: 'Room 234 Sensor',
            isGateway: undefined,
            profile: 'DEVICE',
          },
        ],
      },
    });
  });

  it('get user devices -> HTTP ERROR', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getCustomerDevices('1')).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ data: [] },
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('test token setter -> value set', async () => {
    service.setToken('123');
    expect(service.getPrivateToken()).toEqual('123');
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('logout -> return', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    expect(await service.logout('token')).toMatchObject({
      ...tests.TBSuccessResponse,
      ...{},
    });
  });

  it('logout -> HTTP ERROR', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.logout('token')).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'ECONNREFUSED' },
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('create reserve -> no token', async () => {
    service.setToken(null);
    expect(
      await service.createReserve(tests.user, tests.userPassword)
    ).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'no access token' },
    });
  });

  it('create reserve -> check admin', async () => {
    service.setToken('token');

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.createReserve(tests.user, tests.userPassword)
    ).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'ECONNREFUSED' },
    });

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(
      await service.createReserve(tests.user, tests.userPassword)
    ).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'user is not an admin' },
    });

    const obj = tests.axiosUserSuccessExample;
    delete obj.data.authority;
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(obj));
    expect(
      await service.createReserve(tests.user, tests.userPassword)
    ).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'user is not an admin' },
    });
  });

  it('create reserve -> create fail', async () => {
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.createReserve(tests.user, tests.userPassword)
    ).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'ECONNREFUSED' },
    });
  });

  it('create reserve -> create pass', async () => {
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(
      await service.createReserve(tests.user, tests.userPassword)
    ).toMatchObject({
      ...tests.TBSuccessResponse,
      ...{ explanation: 'call finished' },
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('reserve perimeter -> no user', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getReservePerimeter()).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'ECONNREFUSED' },
    });
  });

  it('reserve perimeter -> no asset', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getReservePerimeter()).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'ECONNREFUSED' },
    });
  });


  it('reserve perimeter -> no reserve found in asset', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    delete tests.axiosCustomerSuccessExample.data.additionalInfo.location
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(await service.getReservePerimeter()).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'no reserve set' },
    });
  });

  it('reserve perimeter -> return asset', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(await service.getReservePerimeter()).toMatchObject(tests.TBSuccessResponse);
  });
  //////////////////////////////////////////////////////////////////////////////////////////

  it('Historical Data -> no token', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getDeviceHistoricalData('1', 2, 3)).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'token' },
    });
  });

  it('Historical Data -> HTTP ERROR', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getDeviceHistoricalData('1', 2, 3)).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'device with ID not found for user token combination' },
    });

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    const obj = Object.assign(tests.axiosTokenSuccessExample);
    obj.data = null;
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.getDeviceHistoricalData('1', 2, 3)).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'device with ID not found for user token combination' },
    });
  });

  it('Historical Data -> telemetry fail', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getDeviceHistoricalData('1', 2, 3)).toMatchObject({
      ...tests.TBFailureResponse,
      ...{ explanation: 'ECONNREFUSED' },
    });
  });

  it('Historical Data -> result', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTelemetrySuccessExample));
    expect(await service.getDeviceHistoricalData('1', 2, 3)).toMatchObject({
      status: 'ok',
      name: '1',
      explanation: 'Room 234 Sensor',
      furtherExplain: 'A4B72CCDFF33',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('refresh -> return tokens', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.refresh('1')).toMatchObject({
      ...tests.TBSuccessResponse,
      ...{ token: 'we12nklJQW', refreshToken: 'w3hjkqlbdwejkdn89' },
    });
  });

  it('refresh -> HTTP ERROR', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.refresh('1')).toMatchObject(tests.TBFailureResponse);
  });
  //////////////////////////////////////////////////////////////////////////////////////////
  it('validate token -> return tokens', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.validateToken()).toEqual(true);
  });

  it('validate token -> No token', async () => {
    service.setToken('');
    expect(await service.validateToken()).toEqual(false);
  });

  it('validate token -> HTTP ERROR', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.validateToken()).toEqual(false);
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('validate token param -> return tokens', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.validateTokenParam('1')).toEqual(true);
  });

  it('validate token param -> No token', async () => {
    expect(await service.validateTokenParam('')).toEqual(false);
  });

  it('validate token param -> HTTP ERROR', async () => {
    service.setToken('123');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.validateTokenParam('1')).toEqual(false);
  });
  //////////////////////////////////////////////////////////////////////////////////////////
  it('device info -> login fail', async () => {
    expect(await service.getDeviceInfos()).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('device info -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getDeviceInfos()).toMatchObject({
      status: 'fail',
      explanation: 'user type unknown',
    });
  });

  it('device info -> no reserve id for tenant admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    expect(await service.getDeviceInfos()).toMatchObject({
      status: 'fail',
      explanation: 'an Admin requires a reserve ID',
    });
  });

  it('device info -> no reserve id for tenant admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    expect(await service.getDeviceInfos()).toMatchObject({
      status: 'fail',
      explanation: 'an Admin requires a reserve ID',
    });
  });

  it('device info -> device infos for admin, no filter', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect(await service.getDeviceInfos([], '1')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: [
        {
          deviceID: '784f394c-42b6-435a-983c-b7beff2784f9',
          isGateway: undefined,
          deviceName: 'A4B72CCDFF33',
          humanName: 'Room 234 Sensor',
          profile: 'DEVICE',
        },
      ],
    });
  });

  it('device info -> device infos for admin, with filter', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect(
      await service.getDeviceInfos(
        ['784f394c-42b6-435a-983c-b7beff2784f9'],
        '1'
      )
    ).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: [
        {
          deviceID: '784f394c-42b6-435a-983c-b7beff2784f9',
          isGateway: undefined,
          deviceName: 'A4B72CCDFF33',
          humanName: 'Room 234 Sensor',
          profile: 'DEVICE',
        },
      ],
    });
  });

  it('device info -> device infos for user, no filter', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect(await service.getDeviceInfos([], '1')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: [
        {
          deviceID: '784f394c-42b6-435a-983c-b7beff2784f9',
          isGateway: undefined,
          deviceName: 'A4B72CCDFF33',
          humanName: 'Room 234 Sensor',
          profile: 'DEVICE',
        },
      ],
    });
  });

  it('device info -> device infos for user, with filter', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect(
      await service.getDeviceInfos(
        ['784f394c-42b6-435a-983c-b7beff2784f9'],
        '1'
      )
    ).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: [
        {
          deviceID: '784f394c-42b6-435a-983c-b7beff2784f9',
          isGateway: undefined,
          deviceName: 'A4B72CCDFF33',
          humanName: 'Room 234 Sensor',
          profile: 'DEVICE',
        },
      ],
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('create device -> login fail', async () => {
    expect(
      await service.addDeviceToReserve('', {
        hardwareID: '',
        isGateway: true,
        labelName: '',
      })
    ).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('create device -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.addDeviceToReserve('', {
        hardwareID: '',
        isGateway: true,
        labelName: '',
      })
    ).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('create device -> not admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(
      await service.addDeviceToReserve('', {
        hardwareID: '',
        isGateway: true,
        labelName: '',
      })
    ).toMatchObject({
      status: 'fail',
      explanation: 'wrong permissions',
    });
  });

  it('create device -> get reserve fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.addDeviceToReserve('', {
        hardwareID: '',
        isGateway: true,
        labelName: '',
      })
    ).toMatchObject({
      status: 'fail',
      explanation: 'customer ID failed with 500',
    });
  });

  it('create device -> create device fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.addDeviceToReserve('', {
        hardwareID: '',
        isGateway: true,
        labelName: '',
      })
    ).toMatchObject({
      status: 'fail',
      explanation: 'device creation failed with: ECONNREFUSED',
    });
  });

  it('create device -> assign device fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    //jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosDeviceSuccessExample));
    expect(
      await service.addDeviceToReserve('', {
        hardwareID: '',
        isGateway: true,
        labelName: '',
      })
    ).toMatchObject({
      status: 'fail',
      explanation: 'assign failed, device creation reversed',
    });
  });

  it('create device -> assign device and return', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    //jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(
      await service.addDeviceToReserve('', {
        hardwareID: '',
        isGateway: true,
        labelName: '',
      })
    ).toMatchObject({
      status: 'ok',
      explanation: 'ok',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('delete device -> login fail', async () => {
    expect(await service.RemoveDeviceFromReserve('1')).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('delete device -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.RemoveDeviceFromReserve('1')).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('delete device -> not admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.RemoveDeviceFromReserve('1')).toMatchObject({
      status: 'fail',
      explanation: 'wrong permissions',
    });
  });

  it('delete device -> delete fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.RemoveDeviceFromReserve('1')).toMatchObject({
      status: 'fail',
      explanation: 'device deletion failed',
    });
  });

  it('delete device -> delete pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.RemoveDeviceFromReserve('1')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('add user to reserve -> login fail', async () => {
    expect(await service.addUserToReserve('1', '', '', '', [])).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('add user to reserve -> user not admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.addUserToReserve('1', '', '', '', [])).toMatchObject({
      status: 'fail',
      explanation: 'user not admin',
    });
  });

  it('add user to reserve -> user create failed', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.addUserToReserve('1', '', '', '', [])).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('add user to reserve -> user create pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    expect(await service.addUserToReserve('1', '', '', '', [])).toMatchObject({
      status: 'ok',
      explanation: 'ok',
    });
  });
  //////////////////////////////////////////////////////////////////////////////////////////

  it('change reserve for user -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.addUserToReserve("ef55ff40-dfe8-11ec-bdb3-750ce7ed2451", "lb@g.com","l", "b"));*/
    expect(await service.changeReserveForUser('1')).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('change reserve for user -> user not in reserve', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.changeReserveForUser('')).toMatchObject({
      status: 'fail',
      explanation: 'user not in reserve',
    });
  });

  it('change reserve for user -> change fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.changeReserveForUser('1')).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('change reserve for user -> change pass', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(await service.changeReserveForUser('1')).toMatchObject({
      status: 'ok',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('change reserve available for user -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
true
);
console.log(await service.addUserToReserve("ef55ff40-dfe8-11ec-bdb3-750ce7ed2451", "lb@g.com","l", "b"));*/
    expect(
      await service.changeReservesAvailableforUser('2', [{ reserveName: "reserve", reserveID: "1" }])
    ).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('change reserve available for user -> user not admin', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(
      await service.changeReservesAvailableforUser('2', [{ reserveName: "reserve", reserveID: "1" }])
    ).toMatchObject({
      status: 'fail',
      explanation: 'user not admin',
    });
  });

  it('change reserve available for user -> user info fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.changeReservesAvailableforUser('2', [{ reserveName: "reserve", reserveID: "1" }])
    ).toMatchObject({
      status: 'fail',
      explanation: 'user is not available',
      furtherExplain: 'ECONNREFUSED',
    });
  });

  it('change reserve available for user -> user update fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.changeReservesAvailableforUser('2', [{ reserveName: "reserve", reserveID: "1" }])
    ).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('change reserve available for user -> user update pass', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(
      await service.changeReservesAvailableforUser('2', [{ reserveName: "reserve", reserveID: "1" }])
    ).toMatchObject({
      status: 'ok',
      explanation: 'ok',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////
  it('remove user from reserve -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/ expect(
    await service.removeReserveUser('2')
  ).toMatchObject({
    status: 'fail',
    explanation: 'token invalid',
  });
  });

  it('remove user from reserve -> user not admin', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.removeReserveUser('2')).toMatchObject({
      status: 'fail',
      explanation: 'user not admin',
    });
  });

  it('remove user from reserve -> delete failed', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.removeReserveUser('2')).toMatchObject({
      status: 'fail',
      explanation: 'delete failed',
    });
  });

  it('remove user from reserve -> delete pass', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.removeReserveUser('2')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('disable user -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/ expect(
    await service.disableUser('2')
  ).toMatchObject({
    status: 'fail',
    explanation: 'token invalid',
  });
  });

  it('disable user -> user not admin', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.disableUser('2')).toMatchObject({
      status: 'fail',
      explanation: 'user not admin',
    });
  });

  it('disable user -> disable fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.disableUser('2')).toMatchObject({
      status: 'fail',
      explanation: 'disable failed',
      furtherExplain: 'ECONNREFUSED',
    });
  });

  it('disable user -> disable user', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.disableUser('2')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('enable user -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/ expect(
    await service.enableUser('2')
  ).toMatchObject({
    status: 'fail',
    explanation: 'token invalid',
  });
  });

  it('enable user -> user not admin', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.enableUser('2')).toMatchObject({
      status: 'fail',
      explanation: 'user not admin',
    });
  });

  it('enable user -> disable fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.enableUser('2')).toMatchObject({
      status: 'fail',
      explanation: 'enable failed',
      furtherExplain: 'ECONNREFUSED',
    });
  });

  it('enable user -> disable user', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.enableUser('2')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('v1 send telemetry -> pass', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/

    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));

    expect(
      await service.v1SendTelemetry('sadfj-assen-12xed-esawf', { rssi: 2000 })
    ).toEqual({ status: 200, explanation: 'call finished' });
  });

  it('v1 send telemetry -> fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/

    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.v1SendTelemetry('sadfj-assen-12xed-esawf', { rssi: 2000 })
    ).toEqual({ status: 500, explanation: 'send telemetry failed' });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('get gateway location -> login fail', async () => {
    service.setToken('1');
    /*jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));*/
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );

    expect(await service.getGatewayLocation('2')).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('get gateway location -> device find fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );

    expect(await service.getGatewayLocation('2')).toMatchObject({
      status: 'fail',
      explanation: 'device not found',
    });
  });

  it('get gateway location -> gateway info fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getGatewayLocation('2')).toMatchObject({
      status: 'fail',
      explanation: 'call failed',
    });
  });

  it('get gateway location -> gateway info pass', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        of(tests.axiosDeviceAttributeSuccessExample)
      );
    expect(await service.getGatewayLocation('2')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: undefined,
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('set gateway location -> login fail', async () => {
    service.setToken('1');
    /*jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));*/
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );

    expect(
      await service.setGatewayLocation('2', { latitude: 1, longitude: 2 })
    ).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('set gateway location -> device find fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );

    expect(
      await service.setGatewayLocation('2', { latitude: 1, longitude: 2 })
    ).toMatchObject({
      status: 'fail',
      explanation: 'device not found',
    });
  });

  it('set gateway location -> gateway set fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.setGatewayLocation('2', { latitude: 1, longitude: 2 })
    ).toMatchObject({
      status: 'fail',
      explanation: '500',
    });
  });

  it('set gateway location -> gateway set pass', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    expect(
      await service.setGatewayLocation('2', { latitude: 1, longitude: 2 })
    ).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });
  //////////////////////////////////////////////////////////////////////////////////////////
  it('admin get customers -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/ expect(
    await service.AdminGetCustomers()
  ).toMatchObject({
    status: 'fail',
    explanation: 'token invalid',
  });
  });

  it('admin get customers -> user not admin', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.AdminGetCustomers()).toMatchObject({
      status: 'fail',
      explanation: 'user not admin',
    });
  });

  it('admin get customers -> get customers fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.AdminGetCustomers()).toMatchObject({
      status: 'fail',
      explanation: '500',
    });
  });

  it('admin get customers -> get customers fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    expect(await service.AdminGetCustomers()).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: tests.CustomersExample,
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('admin get users -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/ expect(
    await service.AdminGetUsersFromReserve('1')
  ).toMatchObject({
    status: 'fail',
    explanation: 'token invalid',
  });
  });

  it('admin get users -> user not admin', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.AdminGetUsersFromReserve('1')).toMatchObject({
      status: 'fail',
      explanation: 'user not admin',
    });
  });

  it('admin get users -> get users fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.AdminGetUsersFromReserve('1')).toMatchObject({
      status: 'fail',
      explanation: '500',
    });
  });

  it('admin get users -> get users fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    expect(await service.AdminGetUsersFromReserve('1')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: tests.CustomersExample,
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////

  it('update reserve perimeter -> login fail', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/ expect(
    await service.updateReservePerimeter('1', null)
  ).toMatchObject({
    status: 'fail',
    explanation: 'token invalid',
  });
  });

  it('update reserve perimeter -> user not admin', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(
      await service.updateReservePerimeter('1', null)
    ).toMatchObject({
      status: 'fail',
      explanation: 'wrong permissions',
    });
  });

  it('update reserve perimeter -> reserve info fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.updateReservePerimeter('1', null)
    ).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('update reserve perimeter -> reserve update fail', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.updateReservePerimeter('1', null)
    ).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    delete tests.axiosCustomerSuccessExample.data.additionalInfo.location;
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.updateReservePerimeter('1', /*{
        center: {
          latitude: 1,
          longitude: 1,
        },
        location: [
          { latitude: 1, longitude: 1 },
          { latitude: 2, longitude: 2 },
        ],
      }*/null)
    ).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('update reserve perimeter -> reserve update', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(
      await service.updateReservePerimeter('1', null)
    ).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  it('update reserve perimeter -> reserve update', async () => {
    service.setToken('1');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    delete tests.axiosCustomerSuccessExample.data.externalId
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(
      await service.updateReservePerimeter('1', null)
    ).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('generate reserve list -> login fail', async () => {
    /*await service.loginUser('server@thingsboard.org', 'thingsboardserveraccountissecure')

    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
     status : 'ok',
     explanation: 'call finished'
    })*/
    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('generate reserve list -> not admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'user not reserve admin',
    });
  });

  it('generate reserve list -> customers info fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('generate reserve list -> tenant group info fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    /*jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTenantSuccessExample));*/
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'tenant group fail',
    });
  });

  it('generate reserve list -> sys admin login fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTenantSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'server token fail',
    });
  });

  it('generate reserve list -> update fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTenantSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('generate reserve list -> update pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomersSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTenantSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTenantSuccessExample));
    expect(await service.generateReserveList_ReserveAdmin()).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('generate reserve list sys admin -> login fail', async () => {
    /*await service.loginUser('server@thingsboard.org', 'thingsboardserveraccountissecure')

    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
     status : 'ok',
     explanation: 'call finished'
    })*/
    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'token invalid',
    });
  });

  it('generate reserve list sys admin -> not admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'user not system admin',
    });
  });

  it('generate reserve list sys admin -> tenant info fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosSysAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'tenant info',
      furtherExplain: 'ECONNREFUSED',
    });
  });

  it('generate reserve list sys admin -> update fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosSysAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTenantsSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
      status: 'fail',
      explanation: "ECONNREFUSED"
    });
  });

  it('generate reserve list sys admin -> update pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosSysAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTenantsSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.generateReserveList_SystemAdmin()).toMatchObject({
      status: 'ok',
      explanation: "call finished"
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('customer info -> pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    expect(await service.CustomerInfo("1")).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  it('customer info -> fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.CustomerInfo("1")).toMatchObject({
      status: 'fail',
      explanation: "ECONNREFUSED"
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('remove reserve -> pass', async () => {
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    expect(await service.removeReserve("1")).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  it('remove reserve -> pass', async () => {
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.removeReserve("1")).toMatchObject({
      status: 'fail',
      explanation: "ECONNREFUSED"
    });
  });


  //////////////////////////////////////////////////////////////////////
  it('user info from token -> fail', async () => {
    expect(await service.getUserInfoFromToken()).toMatchObject({ status: 'fail', explanation: 'ECONNREFUSED' });
  });

  it('user info from token -> pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.getUserInfoFromToken()).toMatchObject({
      status: 'ok',
      explanation: "call finished",
      ...{ data: tests.axiosUserSuccessExample.data }
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('get reserve list -> no user', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getReserveList()).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('get reserve list -> not admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.getReserveList()).toMatchObject({
      status: 'fail',
      explanation: 'request not made by an admin',
    });
  });

  it('get reserve list -> server fail login', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getReserveList()).toMatchObject({
      status: 'fail',
      explanation: 'server fail',
    });
  });

  it('get reserve list -> server fail get list', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(service, 'loginUser')
      .mockImplementationOnce(async () => true);
    jest
      .spyOn(service, 'generateReserveList_SystemAdmin')
      .mockImplementationOnce(() => null);
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getReserveList()).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('get reserve list -> server pass get list', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(service, 'loginUser')
      .mockImplementationOnce(async () => true);
    jest
      .spyOn(service, 'generateReserveList_SystemAdmin')
      .mockImplementationOnce(() => null);
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosSysAdminSuccessExample));
    expect(await service.getReserveList()).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      data: []
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('assign device -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.assignDeviceToReserve('a', 'b')).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('assign device -> not admin', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.assignDeviceToReserve('a', 'b')).toMatchObject({
      status: 'fail',
      explanation: 'not admin',
    });
  });

  it('assign device -> pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    expect(await service.assignDeviceToReserve('a', 'b')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  it('assign device -> assign fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.assignDeviceToReserve('a', 'b')).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('user info by id -> fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getUserInfoByID('a')).toMatchObject({
      status: 'fail',
      explanation: 'ECONNREFUSED',
    });
  });

  it('user info by id -> pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.getUserInfoByID('a')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////

  it('updateReserveInfo -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.updateReserveInfo("", {
      title: '',
      region: '',
      country: '',
      city: '',
      address: '',
      address2: '',
      zip: '',
      phone: '',
      email: '',
    })).toMatchObject({
      status: 'fail',
      explanation: 'token fail',
    });
  });

  it('updateReserveInfo -> permission fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.updateReserveInfo("", {
      title: '',
      region: '',
      country: '',
      city: '',
      address: '',
      address2: '',
      zip: '',
      phone: '',
      email: '',
    })).toMatchObject({
      status: 'fail',
      explanation: 'wrong permissions',
    });
  });

  it('updateReserveInfo -> reserve info fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.updateReserveInfo("", {
      title: '',
      region: '',
      country: '',
      city: '',
      address: '',
      address2: '',
      zip: '',
      phone: '',
      email: '',
    })).toMatchObject({
      status: 'fail',
      explanation: 'reserve info',
    });
  });

  it('updateReserveInfo -> reserve update fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.updateReserveInfo("", {
      title: '',
      region: '',
      country: '',
      city: '',
      address: '',
      address2: '',
      zip: '',
      phone: '',
      email: '',
    })).toMatchObject({
      status: 'fail',
      explanation: 'reserve update',
    });
  });

  it('updateReserveInfo -> pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(await service.updateReserveInfo("", {
      title: '',
      region: '',
      country: '',
      city: '',
      address: '',
      address2: '',
      zip: '',
      phone: '',
      email: '',
    })).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////
  it('update user -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.updateUser('', { firstName: '', lastName: '' })).toMatchObject({
      status: 'fail',
      explanation: 'token',
    });
  });

  it('update user -> user to update check fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.updateUser('', { firstName: '', lastName: '' })).toMatchObject({
      status: 'fail',
      explanation: 'user to update',
    });
  });

  it('update user -> update fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.updateUser('', { firstName: '', lastName: '' })).toMatchObject({
      status: 'fail',
      explanation: 'update',
    });
  });

  it('update user -> pass', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    expect(await service.updateUser('', { firstName: '', lastName: '' })).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////
  it('unassign device -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.unassignDevice('')).toMatchObject({
      status: 'fail',
      explanation: 'token',
    });
  });

  it('unassign device -> not admin', async () => {
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.unassignDevice('')).toMatchObject({
      status: 'fail',
      explanation: 'not admin',
    });
  });

  it('unassign device -> unassign fail', async () => {
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.unassignDevice('')).toMatchObject({
      status: 'fail',
      explanation: 'unassign',
    });
  });

  it('unassign device -> pass', async () => {
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
    .spyOn(httpService, 'delete')
    .mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    expect(await service.unassignDevice('')).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
    });
  });

  //////////////////////////////////////////////////////////////////////
  it('get unassigned devices -> not admin', async () => {
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosUserSuccessExample));
    expect(await service.getUnassignedDevicesForAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'not admin',
    });
  });

  it('get unassigned devices -> get fail', async () => {
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getUnassignedDevicesForAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'get',
    });
  });

  it('get unassigned devices -> pass', async () => {
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosAdminSuccessExample));
    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect(await service.getUnassignedDevicesForAdmin()).toMatchObject({
      status: 'ok',
      explanation: 'call finished',
      "data": [
             {
               "deviceID": "784f394c-42b6-435a-983c-b7beff2784f9",
               "deviceName": "A4B72CCDFF33",
             },
           ]
    });
  });

  it('get unassigned devices -> user fail', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(await service.getUnassignedDevicesForAdmin()).toMatchObject({
      status: 'fail',
      explanation: 'user',
      furtherExplain:"ECONNREFUSED"
    });
  });


});

//////////////////////////////////////////////////////////////////////


const mockReservePerimeterCall = {
  lastUpdateTs: 1654150471642,
  key: 'reservePerimeter',
  value: {
    reserveName: 'UP',
    center: {
      latitude: '-25.755123',
      longitude: '28.231999',
    },
    location: [
      {
        latitude: '-25.753785',
        longitude: '28.231703',
      },
      {
        latitude: '-25.755650',
        longitude: '28.230737',
      },
      {
        latitude: '-25.757089',
        longitude: '28.233456',
      },
      {
        latitude: '-25.756385',
        longitude: '28.236474',
      },
      {
        latitude: '-25.754765',
        longitude: '28.235663',
      },
    ],
  },
};
