import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';
import { AxiosResponse } from 'axios';

describe('ThingsboardThingsboardTelemetryService', () => {
  let service: ThingsboardThingsboardTelemetryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardTelemetryService],
      imports: [HttpModule],
    }).compile();
    service = module.get(ThingsboardThingsboardTelemetryService);

    service.setToken('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFtYnVyZ2VzczI5OUBnbWFpbC5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjhhNWZhYTkwLWNlMDAtMTFlYy1iZmJlLWM5MWZkMjJmMmI0YyIsImZpcnN0TmFtZSI6ImxpYW0iLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiNjhjMzYzNDAtY2UwMC0xMWVjLWJmYmUtYzkxZmQyMmYyYjRjIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjUyMTk0OTE1LCJleHAiOjE2NTIyMDM5MTV9.mNT8Esh4LnNo8_VjD-FkDlgmxKfUjRxxHUCtMJSLcjRppy9MI8W4pL0ZxwegT6-dmLNF4rWuz5FrNW-ypKzAiQ');
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get telemetry and return 200 - OK', () => {
    service.getTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846").subscribe((resp : AxiosResponse['data']) => {
      expect(resp).toHaveProperty('longitude');
      expect(resp).toHaveProperty('latitude');
    })
  })

});
