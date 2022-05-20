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

    service.setToken('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFtYnVyZ2VzczI5OUBnbWFpbC5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6IjhhNWZhYTkwLWNlMDAtMTFlYy1iZmJlLWM5MWZkMjJmMmI0YyIsImZpcnN0TmFtZSI6ImxpYW0iLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiNjhjMzYzNDAtY2UwMC0xMWVjLWJmYmUtYzkxZmQyMmYyYjRjIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjUyMzkyOTA2LCJleHAiOjE2NTI0MDE5MDZ9.589AxKu5eTwV2MiKcCPWW8I8kYlvmvUr-73W0jDX0jltYtEq67lG4EqoetyzteHp0G_HAmuQBD2FXvdgAWhCBA')
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
      //console.log(resp.status);
      expect(resp.status).toEqual(200)
    });
  })

});
