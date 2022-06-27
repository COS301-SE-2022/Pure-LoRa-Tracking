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

  const username = process.env.TB_PASSWORD;
  const password = process.env.TB_USERNAME;

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

      const resp = await service.getTelemetry(deviceID, deviceType, 0, 1654072587463);
      console.log(resp.data)

      expect(resp.data.telemetryResults[0].longitude).toBeDefined();
      expect(resp.data.telemetryResults[0].timestamp).toBeDefined();
      expect(resp.data.telemetryResults[0].latitude).toBeDefined();


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

        

      const resp = await service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", 21.06, 21.0);
      expect(resp).toEqual({"explanation": "ok", "status": 200});

    /*service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", 21.06, 21.0).subscribe((resp)=> {
      //console.log(resp.status);
      expect(resp.status).toEqual(200)
    });*/
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

        

      const resp = await service.sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE", JSON.stringify({
        "rssi" : 1000
      }));
      expect(resp).toEqual({"explanation": "ok", "status": 200});
  });

  it('should return status ok 200', async()=> {
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

        

      const resp = await service.V1sendJsonTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", {
        "rssi" : 1000
      });
      expect(resp).toEqual(200);

  })


});

