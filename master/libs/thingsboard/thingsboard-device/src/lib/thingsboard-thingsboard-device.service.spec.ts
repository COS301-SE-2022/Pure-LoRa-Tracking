import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardDeviceService } from './thingsboard-thingsboard-device.service';


describe('ThingsboardThingsboardDeviceService', () => {
  let service: ThingsboardThingsboardDeviceService;
  let loginService: ThingsboardThingsboardUserService;
  const username = "reserveAdmin@reserve.com";
  const password = "reserve";

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardDeviceService],
      imports: [HttpModule, ThingsboardThingsboardUserModule],
    }).compile();

    service = module.get(ThingsboardThingsboardDeviceService);
    loginService = module.get(ThingsboardThingsboardUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get the device infos and print them...', async()=> {
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    const userinfo = await loginService.userInfo(data['data']['token']);
    const custID = userinfo['data']['customerId']['id'];
    expect(custID).toBeDefined();
    const DeviceData = await service.getCustomerDevices(0, 5, custID);
    console.log(service.processDevices(DeviceData['data']['data']));*/
  })

  it('should create a device and return status 200', async ()=> {
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    expect(await service.createDevice('123', 'testingSensor', false)).toEqual(true);*/
  })

  it('should delete te target device and return status 200', async()=> {
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    expect(await service.deleteDevice("8e4fcc90-dc0e-11ec-931b-3544ea43758e")).toEqual(true);*/
  })
});
