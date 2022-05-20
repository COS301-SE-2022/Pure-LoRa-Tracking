import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';

describe('ThingsboardThingsboardClientService', () => {
  let service: ThingsboardThingsboardClientService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardClientService],
      imports : [ThingsboardThingsboardUserModule, ThingsboardThingsboardTelemetryModule]
    }).compile();

    service = module.get(ThingsboardThingsboardClientService);

  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should not throw an error to pass', ()=> {
    const username = "liamburgess299@gmail.com";
    const password = "L19m2992";
    const deviceID = "acf22a00-ce06-11ec-b2d0-bd829ba84846";
    const deviceType = "DEVICE_PROFILE";

    expect(service.adminSendTelemetry(deviceID, username, password, deviceType, {"latitude":-21.89, "longitude":19.56}))
  })
});
