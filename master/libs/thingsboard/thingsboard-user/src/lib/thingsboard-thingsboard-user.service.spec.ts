import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardUserService } from './thingsboard-thingsboard-user.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';


describe('ThingsboardThingsboardUserService', () => {
  let service: ThingsboardThingsboardUserService;
  let httpService: HttpService;
  const username = "reserveadmin@reserve.com";
  const password = "reserve";
  const custID = "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451";

  beforeAll(async () => {
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

  /////////////////////////////////////////////////////////////////

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

  /////////////////////////////////////////////////////////////////

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

  /////////////////////////////////////////////////////////////////

  it("Should print user info", async () => {
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
    const login = await service
      .login(username, password);
    
    result.data = {
      "id": {
        "id": "784f394c-42b6-435a-983c-b7beff2784f9",
        "entityType": "USER"
      },
      "createdTime": 1609459200000,
      "tenantId": {
        "id": "784f394c-42b6-435a-983c-b7beff2784f9",
        "entityType": "TENANT"
      },
      "customerId": {
        "id": "784f394c-42b6-435a-983c-b7beff2784f9",
        "entityType": "CUSTOMER"
      },
      "email": "reserveuser@reserve.com",
      "name": "reserveuser@reserve.com",
      "authority": "TENANT_ADMIN",
      "firstName": "John",
      "lastName": "Doe",
      "additionalInfo": {}
    }
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const userInfo = await service.userInfo(login['data']['token']);
    expect(userInfo['data']['customerId']['id']).toBeDefined();
  })

  /////////////////////////////////////////////////////////////////

  it("should return the customer info", async()=> {
    //const Login = await service.login(username, password);
    //console.log(await service.userInfoByCustID(Login['data']['token'], custID));
  })


});
