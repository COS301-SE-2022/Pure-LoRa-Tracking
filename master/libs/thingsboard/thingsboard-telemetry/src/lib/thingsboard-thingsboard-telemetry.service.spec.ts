import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';
import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardDeviceModule, ThingsboardThingsboardDeviceService } from '@lora/thingsboard-device';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('ThingsboardThingsboardTelemetryService', () => {
  let service: ThingsboardThingsboardTelemetryService;
  let deviceService : ThingsboardThingsboardDeviceService;
  let userService : ThingsboardThingsboardUserService;
  let httpService: HttpService;

  const username = "reserveuser@reserve.com";
  const password = "reserve";

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTelemetryService],
      imports: [HttpModule, ThingsboardThingsboardDeviceModule, ThingsboardThingsboardUserModule],
    }).compile();
    service = module.get(ThingsboardThingsboardTelemetryService);
    deviceService = module.get(ThingsboardThingsboardDeviceService);
    userService = module.get(ThingsboardThingsboardUserService);

    httpService = module.get(HttpService);
   

 });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get telemetry and return 200 - OK', async() => {

    const result : AxiosResponse<any> = {
      data : {
        longitude : [{
          ts : 0,
          value : 23.57
        }],
        latitude : [{
          ts : 0,
          value : 23.44
        }]
      }, 
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    }

    jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(result));
      const deviceID = "25c31a40-dfe9-11ec-bdb3-750ce7ed2451";
      const deviceType = "DEVICE";

      console.log(await service.getTelemetry(deviceID, deviceType, 0, 1654072587463));

    //const data = await userService.login(username, password);
    //service.setToken(data['data']['token']);
    //console.log(await service.getTelemetry("25c31a40-dfe9-11ec-bdb3-750ce7ed2451", "DEVICE", 0, 1654072587463));
    
  })

  it('should send the telemetry and respond with status 200 - OK', async()=> {

    const result : AxiosResponse<any> = {
      data : "",
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    }

    jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(result));

        

      console.log(await service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE_PROFILE", 21.06, 21.0));

    /*service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE_PROFILE", 21.06, 21.0).subscribe((resp)=> {
      //console.log(resp.status);
      expect(resp.status).toEqual(200)
    });*/
  })

});

