import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardReserveService } from './thingsboard-thingsboard-reserve.service';

describe('ThingsboardThingsboardReserveService', () => {
  let service: ThingsboardThingsboardReserveService;
  let userService: ThingsboardThingsboardUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardReserveService],
      imports : [HttpModule, ThingsboardThingsboardUserModule],
    }).compile();

    service = module.get(ThingsboardThingsboardReserveService);
    userService = module.get(ThingsboardThingsboardUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should create the reserve group', async () => {
    /*const login = await userService.login("reserveadmin@reserve.com", "reserve");
    expect(login.data.token).toBeDefined();
    service.setToken(login.data.token);
    console.log(await service.createReserveGroup("liamburgess299@gmail.com", "reserveb"));*/
  });

  it('should delete the reserve group', async () => {
    /*const Login = await service.login(username, password);
    console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));*/
  });
});
