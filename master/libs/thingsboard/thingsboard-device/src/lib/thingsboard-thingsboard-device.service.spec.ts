import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardDeviceService } from './thingsboard-thingsboard-device.service';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardTestsModule, ThingsboardThingsboardTestsService } from '@lora/thingsboard/tests';

describe('ThingsboardThingsboardDeviceService', () => {
  let service: ThingsboardThingsboardDeviceService;
  let loginService: ThingsboardThingsboardUserService;
  let httpService: HttpService;
  let tests: ThingsboardThingsboardTestsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardDeviceService],
      imports: [HttpModule, ThingsboardThingsboardUserModule, ThingsboardThingsboardTestsModule],
    }).compile();

    service = module.get(ThingsboardThingsboardDeviceService);
    loginService = module.get(ThingsboardThingsboardUserService);
    httpService = module.get(HttpService);
    tests = module.get(ThingsboardThingsboardTestsService);
    service.setToken("token")
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('get devices -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosDevicesSuccessExample));
    expect(await service.getCustomerDevices(0,5,'custID')).toMatchObject(tests.SuccessResponse);
  });

  it('get devices -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.getCustomerDevices(0,5,'custID')).toMatchObject(tests.ECONNResponse);
  });

  it('get devices -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.getCustomerDevices(0,5,'custID')).toMatchObject(tests.FailResponse);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('create device -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    expect(await service.createDevice('hardwareID', 'deviceLabel', false)).toMatchObject(tests.SuccessResponse);
  });

  it('create device -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    expect(await service.createDevice('hardwareID', 'deviceLabel', true)).toMatchObject(tests.SuccessResponse);
  });

  it('create device -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.createDevice('hardwareID', 'deviceLabel', false)).toMatchObject(tests.ECONNResponse);
  });

  it('create device -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.createDevice('hardwareID', 'deviceLabel', false)).toMatchObject(tests.FailResponse);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('delete device -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.deleteDevice("8e4fcc90-dc0e-11ec-931b-3544ea43758e")).toMatchObject(tests.SuccessResponse);
  });

  it('delete device -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.deleteDevice("8e4fcc90-dc0e-11ec-931b-3544ea43758e")).toMatchObject(tests.ECONNResponse);
  });

  it('delete device -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.deleteDevice("8e4fcc90-dc0e-11ec-931b-3544ea43758e")).toMatchObject(tests.FailResponse);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('assign device -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    expect(await service.assignDevicetoCustomer('custID', 'deviceID')).toMatchObject(tests.SuccessResponse);
  });

  it('assign device -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.assignDevicetoCustomer('custID', 'deviceID')).toMatchObject(tests.ECONNResponse);
  });

  it('assign device -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.assignDevicetoCustomer('custID', 'deviceID')).toMatchObject(tests.FailResponse);
  });


  ///////////////////////////////////////////////////////////////////////////////////////////

  it('remove device -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.removeDeviceFromCustomer("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toEqual(true);
  });

  it('remove device -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.removeDeviceFromCustomer("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toEqual(false);
  });

  it('remove device -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.removeDeviceFromCustomer("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toEqual(false);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('set gateway location -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.setGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451", 
      {latitude : -25, longitude : 23}
    )).toMatchObject(tests.SuccessResponse);
  });

  it('set gateway location -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.setGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451", 
    {latitude : -25, longitude : 23}
  )).toMatchObject(tests.ECONNResponse);
  });

  it('set gateway location -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.setGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451", 
    {latitude : -25, longitude : 23}
  )).toMatchObject(tests.FailResponse);
  });


  ///////////////////////////////////////////////////////////////////////////////////////////

  it('get gateway location -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosDeviceAttributeSuccessExample));
    expect(await service.GetGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.SuccessResponse);
  });

  it('get gateway location -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.GetGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.ECONNResponse);
  });

  it('get gateway location -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.GetGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.FailResponse);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('device access token -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosDeviceCredentialSuccessExample));
    expect(await service.GetAccessToken("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.SuccessResponse);
  });

  it('device access token -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.GetAccessToken("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.ECONNResponse);
  });

  it('device access token -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.GetAccessToken("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.FailResponse);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////
  /* processDevices */
  it('devices process -> return info', async () => {
    expect(service.processDevices(tests.DevicesExample.data)).toMatchObject([
          {
           "deviceID": "784f394c-42b6-435a-983c-b7beff2784f9",
           "deviceName": "A4B72CCDFF33",
           "humanName": "Room 234 Sensor",
           "isGateway": undefined,
           "profile": "DEVICE",
         },
       ]);
  });

  it('devices process -> return [] for null', async () => {
    expect(service.processDevices(null)).toMatchObject([]);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////
  /* getDeviceInfo */
  it('device access token -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosDeviceSuccessExample));
    expect(await service.getDeviceInfo("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.SuccessResponse);
  });

  it('device access token -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.getDeviceInfo("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.ECONNResponse);
  });

  it('device access token -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.getDeviceInfo("2fe67850-dfe9-11ec-bdb3-750ce7ed2451")).toMatchObject(tests.FailResponse);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  /*it('device create -> Mock device', async () => {
    const data = await loginService.login(tests.admin, tests.adminPassword);
    service.setToken(data.data.token);
    expect(await service.createDevice("device2", "rietvlei gateway", true)).toMatchObject(tests.FailResponse);
  });*/


});
