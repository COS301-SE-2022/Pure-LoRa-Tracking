import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiUserEndpointService } from './api-user-endpoint.service';

describe('ApiUserEndpointService', () => {
  let service: ApiUserEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [ThingsboardThingsboardClientModule],
      providers: [ApiUserEndpointService],
    }).compile();

    service = module.get(ApiUserEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the users of the reserve', async()=> {
    /*console.log(await service.AdminAllReserveUsersProcess({
      customerID:"ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3OTEwOTIsImV4cCI6MTY1NDgwMDA5Mn0.7J8AnYhPKPFUBoSe9WupzRTky5xaBFDZ5XHWdQ-wcLg8we8GKA06BOK9FuX8fDVrPVSeI654ZLD_7W1dASEHWA"
    }))*/
  })

  it("should change the user's reserve", async()=> {
    /*console.log(await service.UserChangeReserveProcess({
      reserveID : "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      token : "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6IjU5MTAyZTgwLWY5MmQtMTFlYy1iOWQ5LWIzY2E3ZTQ5NzNhOCIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6InVzZXIiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiY2QyZGYyYjAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiY3VzdG9tZXJJZCI6ImVmNTVmZjQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU2NjczNTE4LCJleHAiOjE2NTY2ODI1MTh9.cVnkCbCQbvSKxhTuvwd9xRR0K21i701p2jKzJHjepTL8AKbaHRY8yq953wklwjI7wuwhhUISCTD4OATPyUu2Pg"
    }))*/
  })
});
