import { ThingsboardThingsboardDeviceService, ThingsboardThingsboardDeviceModule } from "@lora/thingsboard-device";
import { ThingsboardThingsboardUserService, ThingsboardThingsboardUserModule } from "@lora/thingsboard-user";
import { ThingsboardThingsboardTestsService, ThingsboardThingsboardTestsModule } from "@lora/thingsboard/tests";
import { HttpService, HttpModule } from "@nestjs/axios";
import { of, throwError } from "rxjs";
import { ThingsboardThingsboardTelemetryService } from "./thingsboard-thingsboard-telemetry.service";
import { Test } from '@nestjs/testing';


describe('ThingsboardThingsboardTelemetryService', () => {
  let service: ThingsboardThingsboardTelemetryService;
  let deviceService: ThingsboardThingsboardDeviceService;
  let userService: ThingsboardThingsboardUserService;
  let httpService: HttpService;
  let tests: ThingsboardThingsboardTestsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTelemetryService],
      imports: [
        HttpModule,
        ThingsboardThingsboardDeviceModule,
        ThingsboardThingsboardUserModule,
        ThingsboardThingsboardTestsModule,
      ],
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
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTelemetrySuccessExample));
    expect(
      await service.getTelemetry('deviceID', 'deviceType', 'TRI', 0, 1654072587463)
    ).toMatchObject(tests.SuccessResponse);

    expect(
      service.buildTelemetryResults(tests.axiosTelemetrySuccessExample.data)
    ).toMatchObject([
      { longitude: 1, latitude: 3, timestamp: 22 },
      { longitude: 2, latitude: 4, timestamp: 22 },
    ]);
  });

  it('get telemetry -> return info, no time start', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTelemetrySuccessExample));
    expect(await service.getTelemetry('deviceID', 'deviceType')).toMatchObject(
      tests.SuccessResponse
    );

    expect(service.buildTelemetryResults({})).toMatchObject([]);
  });

  it('get telemetry -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.getTelemetry('deviceID', 'deviceType', 'tri', 0, 1654072587463)
    ).toMatchObject(tests.ECONNResponse);
  });

  it('get telemetry -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosFailureExample)
      );
    expect(
      await service.getTelemetry('deviceID', 'deviceType', 'tri', 0, 1654072587463)
    ).toMatchObject(tests.FailResponse);
  });

  ////////////////////////////////////////////////////////////////////////////////

  it('get sensor data -> return info', async () => {
    /*
    service.setToken(
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NjM1OTU0MTUsImV4cCI6MTY2MzYwNDQxNX0.qylikFxTmdm0Ur4hTxo6p7jAcQ_-brgj1oJ-GfF69pSUUOMqL0zmNkooTiKQ3oXBG26zNp6nB8yY-Uv0rujP9w'
    );
   const res = await service.getSensorData(
     '1ecd2e60-dfe9-11ec-bdb3-750ce7ed2451',
     'DEVICE',
     0,
     1663591396352
     );
     console.log(JSON.stringify(res));
     expect(res).toBeDefined();
     */

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.TBkeysTimeseries));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTelemetrySuccessExample));

    expect(
      await service.getSensorData('deviceID', 'deviceType', 1663600326)
    ).toMatchObject(tests.SuccessResponse);
  });



  it('get sensor data -> return info, no time start', async () => {
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.TBkeysTimeseries));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(tests.axiosTelemetrySuccessExample));
    expect(await service.getSensorData('deviceID', 'deviceType')).toMatchObject(
      tests.SuccessResponse
    );
    /*
    service.setToken(
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NjM1OTU0MTUsImV4cCI6MTY2MzYwNDQxNX0.qylikFxTmdm0Ur4hTxo6p7jAcQ_-brgj1oJ-GfF69pSUUOMqL0zmNkooTiKQ3oXBG26zNp6nB8yY-Uv0rujP9w'
    );
    const res = await service.getSensorData(
      '1ecd2e60-dfe9-11ec-bdb3-750ce7ed2451',
      'DEVICE'
    );
    console.log(JSON.stringify(res));
    expect(res).toBeDefined();
    */
  });

  it('get sensor data -> ECONNREFUSED', async () => {
    service.setToken('token');
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.TBkeysTimeseries))
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.getSensorData('deviceID', 'deviceType', 0, 1654072587463)
    ).toMatchObject(tests.ECONNResponse);
  });

  it('get sensor data -> HTTP ERROR', async () => {
    service.setToken('token');
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.TBkeysTimeseries))
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosFailureExample)
      );
    expect(
      await service.getSensorData('deviceID', 'deviceType', 0, 1654072587463)
    ).toMatchObject({status:400, explanation:"Not Authorized"});
  });

  it('get sensor data -> Keys ECONNREFUSED', async () => {
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.getSensorData('deviceID', 'deviceType', 0, 1654072587463)
    ).toMatchObject(tests.ECONNResponse);
  });

  it('get sensor data -> key undefined or null', async () => {
    service.setToken('token');
    const resp = tests.TBkeysTimeseries;
    resp.data = null;
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(resp))
    expect(
      await service.getSensorData('deviceID', 'deviceType', 0, 1654072587463)
    ).toMatchObject({
      status:200,
      data:"",
      explanation:"No Keys Found"
    });

    resp.data = undefined;
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(resp))
    expect(
      await service.getSensorData('deviceID', 'deviceType', 0, 1654072587463)
    ).toMatchObject({
      status:200,
      data:"",
      explanation:"No Keys Found"
    });
  });

  it('get sensor data -> HTTP ERROR', async () => {
    service.setToken('token');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosFailureExample)
      );
    expect(
      await service.getSensorData('deviceID', 'deviceType', 0, 1654072587463)
    ).toMatchObject(tests.FailResponse);
  });

  ////////////////////////////////////////////////////////////////////////////////
  it('send telemetry -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(
      await service.sendTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        'DEVICE',
        21.06,
        21.0
      )
    ).toMatchObject(tests.SuccessResponse);
  });

  it('send telemetry -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.sendTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        'DEVICE',
        21.06,
        21.0
      )
    ).toMatchObject(tests.ECONNResponse);
  });

  it('send telemetry -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosFailureExample)
      );
    expect(
      await service.sendTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        'DEVICE',
        21.06,
        21.0
      )
    ).toMatchObject(tests.FailResponse);
  });

  ////////////////////////////////////////////////////////////////////////////////

  it('send telemetry JSON -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(
      await service.sendJsonTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        'DEVICE',
        JSON.stringify({
          rssi: 1000,
        })
      )
    ).toMatchObject(tests.SuccessResponse);
  });

  it('send telemetry JSON -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.sendJsonTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        'DEVICE',
        JSON.stringify({
          rssi: 1000,
        })
      )
    ).toMatchObject(tests.ECONNResponse);
  });

  it('send telemetry JSON -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosFailureExample)
      );
    expect(
      await service.sendJsonTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        'DEVICE',
        JSON.stringify({
          rssi: 1000,
        })
      )
    ).toMatchObject(tests.FailResponse);
  });
  ////////////////////////////////////////////////////////////////////////////////

  it('send telemetry V1 -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(
      await service.V1sendJsonTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        {
          rssi: 1000,
        }
      )
    ).toEqual(200);
  });

  it('send telemetry V1 -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
    expect(
      await service.V1sendJsonTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        {
          rssi: 1000,
        }
      )
    ).toEqual(500);
  });

  it('send telemetry V1 -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosFailureExample)
      );
    expect(
      await service.V1sendJsonTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846',
        {
          rssi: 1000,
        }
      )
    ).toEqual(400);
  });
  ////////////////////////////////////////////////////////////////////////////////

  it('clear telemetry -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
      expect(
        await service.clearTelemetry(
          'acf22a00-ce06-11ec-b2d0-bd829ba84846'
        )
    ).toMatchObject(tests.SuccessResponse);
  });

  it('clear telemetry -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosECONNFailureExample)
      );
      expect(
        await service.clearTelemetry(
          'acf22a00-ce06-11ec-b2d0-bd829ba84846'
        )
    ).toMatchObject(tests.ECONNResponse);
  });

  it('clear telemetry -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token');
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() =>
        throwError(() => tests.axiosFailureExample)
      );
    expect(
      await service.clearTelemetry(
        'acf22a00-ce06-11ec-b2d0-bd829ba84846'
      )
    ).toMatchObject(tests.FailResponse);
  });

  /*it('send telemetry V1 -> Mock Data', async () => {
    expect(await service.V1sendJsonTelemetry("4uplfXfbFS2q4U4FuHbn", {
      latitude:-25.75550768038334,
      longitude: 28.232975006103516,
      pType: "PF"
    })).toEqual(200);
  });*/
});
