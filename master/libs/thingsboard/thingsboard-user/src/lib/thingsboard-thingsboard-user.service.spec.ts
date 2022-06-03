import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardUserService } from './thingsboard-thingsboard-user.service';
import { AxiosResponse } from 'axios';


describe('ThingsboardThingsboardUserService', () => {
  let service: ThingsboardThingsboardUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardUserService],
      imports: [HttpModule]
    }).compile();

    service = module.get(ThingsboardThingsboardUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('valid login should return token and refreshToken', async() => {
   /* const login = await service
      .login('reserveAdmin@reserve.com', 'reserve');
      expect(login['data']['token']).toBeDefined;*/
  });

  it('should logout and return status 200 - OK', async() => {
   /* const login = await service
      .login('reserveAdmin@reserve.com', 'reserve');
    const logout = await service.logout(login['data']['token']);
    expect(logout['status']).toEqual(200);*/
  });

  it("Should print user info", async()=> {
    const login = await service
      .login('reserveuser@reserve.com', 'reserve');
    //const userInfo = await service.userInfo(login['data']['token']);
    const userInfo = await service.userInfo("132");
    console.log(userInfo['data']['customerId']['id']);
  })
});
