import { ThingsboardThingsboardDeviceModule } from '@lora/thingsboard-device';
import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardUserModule } from '@lora/thingsboard-user';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';

describe('ThingsboardThingsboardClientService', () => {
  let service: ThingsboardThingsboardClientService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardClientService],
      imports : [ThingsboardThingsboardUserModule, ThingsboardThingsboardTelemetryModule, ThingsboardThingsboardDeviceModule]
    }).compile();

    service = module.get(ThingsboardThingsboardClientService);

  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it("should login, acquire userID and print device list from ID", async() => {
    /*expect(await service.loginUser("reserveuser@reserve.com","reserve")).toEqual(true);
    const resp = await service.getUserDevices();
    console.log(resp['data']);*/
  });
});
