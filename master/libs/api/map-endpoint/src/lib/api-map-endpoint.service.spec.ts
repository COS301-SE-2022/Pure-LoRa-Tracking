import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiMapEndpointService } from './api-map-endpoint.service';

describe('ApiMapEndpointService', () => {
  let service: ApiMapEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [ThingsboardThingsboardClientModule],
      providers: [ApiMapEndpointService],
    }).compile();

    service = module.get(ApiMapEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

 /* it('get reserve perimeter', async() => {
    console.log(
      await service.ReserveProcess({token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlcnR3b0ByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6IjZmN2Q2MjkwLTA4MWYtMTFlZC1iZjBhLWQ3ZWM0NjYzNGY2NSIsImZpcnN0TmFtZSI6InJlc2VydmUgdXNlciB0d28iLCJsYXN0TmFtZSI6InJlc2VydmUiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiY2QyZGYyYjAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiY3VzdG9tZXJJZCI6IjM4ZjMyMmEwLTA4MWYtMTFlZC1iZjBhLWQ3ZWM0NjYzNGY2NSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU4MzE2ODQ1LCJleHAiOjE2NTgzMjU4NDV9.zf85urBWY2FTxsot1ZpBdr7N3RqBef4WCMv4b4eOzWWB8Hs9lOv11nOdJKWnv_fWiiEuLHIOXlv7oqRexD3iEw',
    reserveID:'1'})
    );
  });*/
});
