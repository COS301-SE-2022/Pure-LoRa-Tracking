import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';

describe('ThingsboardThingsboardTelemetryService', () => {
  let service: ThingsboardThingsboardTelemetryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTelemetryService],
    }).compile();

    service = module.get(ThingsboardThingsboardTelemetryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
