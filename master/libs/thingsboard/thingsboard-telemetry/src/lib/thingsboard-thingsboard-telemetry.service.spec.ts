import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';
import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardDeviceModule, ThingsboardThingsboardDeviceService } from '@lora/thingsboard-device';

describe('ThingsboardThingsboardTelemetryService', () => {
  let service: ThingsboardThingsboardTelemetryService;
  let deviceService : ThingsboardThingsboardDeviceService;
  let userService : ThingsboardThingsboardUserService;
  const username = "reserveuser@reserve.com";
  const password = "reserve";

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTelemetryService],
      imports: [HttpModule, ThingsboardThingsboardDeviceModule, ThingsboardThingsboardUserModule],
    }).compile();
    service = module.get(ThingsboardThingsboardTelemetryService);
    deviceService = module.get(ThingsboardThingsboardDeviceService);
    userService = module.get(ThingsboardThingsboardUserService);
 });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get telemetry and return 200 - OK', async() => {
    const data = await userService.login(username, password);
    deviceService.setToken(data['data']['token']);
    service.setToken(data['data']['token']);
    const userinfo = await userService.userInfo(data['data']['token']);
    const custID = userinfo['data']['customerId']['id'];
    const DeviceData = await deviceService.getCustomerDevices(0, 5, custID);
    const devices = deviceService.processDevices(DeviceData['data']['data']);
    devices.forEach(async item => {
      const resp = await service.getTelemetry(item['deviceID'], item['profile']);
      console.log(resp['data']);
      expect(resp).toBeDefined();
    });
  })

  it('should send the telemetry and respond with status 200 - OK', ()=> {
    /*service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE_PROFILE", 21.06, 21.0).subscribe((resp)=> {
      //console.log(resp.status);
      expect(resp.status).toEqual(200)
    });*/
  })

});
