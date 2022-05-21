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

  /*it('should not throw an error to pass', ()=> {

  })*/
});
