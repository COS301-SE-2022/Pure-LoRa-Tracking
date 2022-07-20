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
      await service.ReserveProcess({token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlcnR3b0ByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImJkNjJjYjkwLTA4MTQtMTFlZC1iZjBhLWQ3ZWM0NjYzNGY2NSIsImZpcnN0TmFtZSI6InJlc2VydmUgdXNlciB0d28iLCJsYXN0TmFtZSI6InJlc2VydmUiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiY2QyZGYyYjAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiY3VzdG9tZXJJZCI6ImVmNTVmZjQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU4MzE1NDM2LCJleHAiOjE2NTgzMjQ0MzZ9.w3w9cPtEWRsVgXQcKJkGEeCbh1M2hgaTVIX8_UBu4fRMwySg1oxK2XoELzS4eXPvDobdRWbk1bC_jxnSh-pG4Q',
    reserveID:'1'})
    );
  });*/
});
