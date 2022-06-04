import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardUserService } from './thingsboard-thingsboard-user.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';


describe('ThingsboardThingsboardUserService', () => {
  let service: ThingsboardThingsboardUserService;
  let httpService: HttpService;
  const username = "reserveAdmin@reserve.com";
  const password = "reserve";

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardUserService],
      imports: [HttpModule]
    }).compile();

    service = module.get(ThingsboardThingsboardUserService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('valid login should return token and refreshToken', async () => {
    const result: AxiosResponse<any> = {
      data: {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...",
        "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi..."
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const login = await service.login('reserveAdmin@reserve.com', 'reserve');
    expect(login['data']['token']).toBeDefined;
  });

  it('should logout and return status 200 - OK', async () => {
    const result: AxiosResponse<any> = {
      data: {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...",
        "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi..."
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const login = await service.login(username, password);

    result.data = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...",
    }
    
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const logout = await service.logout(login['data']['token']);
    expect(logout['status']).toEqual(200);
  });

  it("Should print user info", async()=> {
    const login = await service
      .login('reserveuser@reserve.com', 'reserve');
    //const userInfo = await service.userInfo(login['data']['token']);
    /*const userInfo = await service.userInfo("132");
    console.log(userInfo['data']['customerId']['id']);*/
  })
});
