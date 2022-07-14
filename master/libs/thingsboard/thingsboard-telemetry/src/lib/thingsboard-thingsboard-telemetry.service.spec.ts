import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';
import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardDeviceModule, ThingsboardThingsboardDeviceService } from '@lora/thingsboard-device';
import { AxiosResponse } from 'axios';
import { ignoreElements, of, throwError } from 'rxjs';
import { ThingsboardThingsboardTestsModule, ThingsboardThingsboardTestsService } from '@lora/thingsboard/tests';

describe('ThingsboardThingsboardTelemetryService', () => {
  let service: ThingsboardThingsboardTelemetryService;
  let deviceService : ThingsboardThingsboardDeviceService;
  let userService : ThingsboardThingsboardUserService;
  let httpService: HttpService;
  let tests: ThingsboardThingsboardTestsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTelemetryService],
      imports: [HttpModule, ThingsboardThingsboardDeviceModule, ThingsboardThingsboardUserModule, ThingsboardThingsboardTestsModule],
    }).compile();
    service = module.get(ThingsboardThingsboardTelemetryService);
    deviceService = module.get(ThingsboardThingsboardDeviceService);
    userService = module.get(ThingsboardThingsboardUserService);
    tests = module.get(ThingsboardThingsboardTestsService);
    httpService = module.get(HttpService);
   

 });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  ////////////////////////////////////////////////////////////////////////////////

  it('get telemetry -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosTelemetrySuccessExample));
    expect(await service.getTelemetry('deviceID', 'deviceType', 0, 1654072587463)).toMatchObject(tests.SuccessResponse);

    expect(service.buildTelemetryResults(tests.axiosTelemetrySuccessExample.data)).toMatchObject([
      { longitude: 1, latitude: 3, timestamp: 22 },
      { longitude: 2, latitude: 4, timestamp: 22 }
    ]);
  });

  it('get telemetry -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.getTelemetry('deviceID', 'deviceType', 0, 1654072587463)).toMatchObject(tests.ECONNResponse);
  });

  it('get telemetry -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.getTelemetry('deviceID', 'deviceType', 0, 1654072587463)).toMatchObject(tests.FailResponse);
  });

  //////////////////////////////////////////////////////////////////////////////// 

  it('send telemetry -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", 21.06, 21.0)).toMatchObject(tests.SuccessResponse);
  });

  it('send telemetry -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", 21.06, 21.0)).toMatchObject(tests.ECONNResponse);
  });

  it('send telemetry -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", 21.06, 21.0)).toMatchObject(tests.FailResponse);
  });

  ////////////////////////////////////////////////////////////////////////////////

  it('send telemetry JSON -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", JSON.stringify({
      "rssi" : 1000
    }))).toMatchObject(tests.SuccessResponse);
  });

  it('send telemetry JSON -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", JSON.stringify({
      "rssi" : 1000
    }))).toMatchObject(tests.ECONNResponse);
  });

  it('send telemetry JSON -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", JSON.stringify({
      "rssi" : 1000
    }))).toMatchObject(tests.FailResponse);
  });
  ////////////////////////////////////////////////////////////////////////////////

  it('send telemetry V1 -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.V1sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", {
      "rssi" : 1000
    })).toEqual(200);
  });

  it('send telemetry V1 -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.V1sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", {
      "rssi" : 1000
    })).toEqual(500);
  });

  it('send telemetry V1 -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.V1sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", {
      "rssi" : 1000
    })).toEqual(400);
  });
  ////////////////////////////////////////////////////////////////////////////////

});

