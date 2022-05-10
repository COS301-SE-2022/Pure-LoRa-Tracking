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

    service.setToken('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFtYnVyZ2VzczI5OUBnbWFpbC5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjhhNWZhYTkwLWNlMDAtMTFlYy1iZmJlLWM5MWZkMjJmMmI0YyIsImZpcnN0TmFtZSI6ImxpYW0iLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiNjhjMzYzNDAtY2UwMC0xMWVjLWJmYmUtYzkxZmQyMmYyYjRjIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjUyMjE0NDI2LCJleHAiOjE2NTIyMjM0MjZ9.1-OedyQOt5cHRjYTNB4I3a6Hw71OdIC044JLyAXfBoEuhyHqmW7wOp095NYf_pBQVeSYOOJo6f54lD5Z5lTSlQ');
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

  it('should send the telemetry and respond with status 200 - OK', ()=> {
    service.sendTelemetry("acf22a00-ce06-11ec-b2d0-bd829ba84846", "DEVICE_PROFILE", 21.06, 21.0).subscribe((resp)=> {
      console.log(resp.status);
    });
  })

});
