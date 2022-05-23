import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';
import { AxiosResponse } from 'axios';
import { ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import exp = require('constants');

describe('ThingsboardThingsboardTelemetryService', () => {
  let service: ThingsboardThingsboardTelemetryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTelemetryService],
      imports: [HttpModule],
    }).compile();
    service = module.get(ThingsboardThingsboardTelemetryService);

 });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get telemetry and return 200 - OK', async() => {
    /*console.log(await service.getTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "default"));*/
  })

  it('should send the telemetry and respond with status 200 - OK', ()=> {
    /*service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE_PROFILE", 21.06, 21.0).subscribe((resp)=> {
      //console.log(resp.status);
      expect(resp.status).toEqual(200)
    });*/
  })

});
