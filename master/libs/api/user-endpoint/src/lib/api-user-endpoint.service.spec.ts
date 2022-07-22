import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiUserEndpointService } from './api-user-endpoint.service';

describe('ApiUserEndpointService', () => {
  let service: ApiUserEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ThingsboardThingsboardClientModule],
      providers: [ApiUserEndpointService],
    }).compile();

    service = module.get(ApiUserEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the users of the reserve', async () => {
    /*console.log(await service.AdminAllReserveUsersProcess({
      customerID:"ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3OTEwOTIsImV4cCI6MTY1NDgwMDA5Mn0.7J8AnYhPKPFUBoSe9WupzRTky5xaBFDZ5XHWdQ-wcLg8we8GKA06BOK9FuX8fDVrPVSeI654ZLD_7W1dASEHWA"
    }))*/
  });

  it("should change the user's reserve", async () => {
    /*console.log(await service.UserChangeReserveProcess({
      reserveID : "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      token : "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6IjU5MTAyZTgwLWY5MmQtMTFlYy1iOWQ5LWIzY2E3ZTQ5NzNhOCIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6InVzZXIiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiY2QyZGYyYjAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiY3VzdG9tZXJJZCI6ImVmNTVmZjQwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU2NjczNTE4LCJleHAiOjE2NTY2ODI1MTh9.cVnkCbCQbvSKxhTuvwd9xRR0K21i701p2jKzJHjepTL8AKbaHRY8yq953wklwjI7wuwhhUISCTD4OATPyUu2Pg"
    }))*/
  });

  it('create user with reserve set', async () => {
    console.log(await service.AddUserProcess({
      customerID: '427430f0-0845-11ed-bc6e-a50062f6cdba',
      reserves: [
        { reserveID: '427430f0-0845-11ed-bc6e-a50062f6cdba', reserveName: 'tuks' },
        { reserveID: 'a0436390-0845-11ed-bc6e-a50062f6cdba', reserveName: 'Rietvlei' },
      ],
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImY3NGNiZjMwLTA4M2UtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsImZpcnN0TmFtZSI6InJlc2VydmUiLCJsYXN0TmFtZSI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6ImVjODY0MzUwLTA4M2UtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY1ODQ4MjU0NSwiZXhwIjoxNjU4NDkxNTQ1fQ.9SjFxAongejI5VqEiWw-uZgid079KRrCq8E7aVO95FY0cYgBdAqs6DqOF5Ch2-PTtWcxbNGRvXonL1PtqVxPcw',
      userInfo: { email: 'reserveuserfour@reserve.com', firstName: 'jack', lastName: 'Johns' },
    }))
  });

  it("get user info", async () => {
    // console.log(
    //   (await service.UserInfoProcess({token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlcnR3b0ByZXNlcnZlLmNvbSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sInVzZXJJZCI6ImQ4ZDRiZjMwLTA3NzYtMTFlZC1iMWU0LWVkZDUzMjRhY2YwNSIsImZpcnN0TmFtZSI6InJlc2VydmUgdXNlciB0d28iLCJsYXN0TmFtZSI6InJlc2VydmUiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiY2QyZGYyYjAtZGZlOC0xMWVjLWJkYjMtNzUwY2U3ZWQyNDUxIiwiY3VzdG9tZXJJZCI6IjRiY2VjZTQwLWUxZDktMTFlYy1hOWI2LWJiYjliYWQzZGYzOSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU4MjQ0MzEwLCJleHAiOjE2NTgyNTMzMTB9.ZvlY6mW8DKBJrp9oF6Adki6ZsWzvxasDVu1KKC0RZYtWojlekkwydn4w6dyX57gG_R3bI5XJPQKwVHfReHS03Q'})).data.additionalInfo
    // )
  });
});
