import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { ThingsboardThingsboardTestsModule, ThingsboardThingsboardTestsService } from '@lora/thingsboard/tests';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardReserveService } from './thingsboard-thingsboard-reserve.service';

describe('ThingsboardThingsboardReserveService', () => {
  let service: ThingsboardThingsboardReserveService;
  let userService: ThingsboardThingsboardUserService;
  let tests: ThingsboardThingsboardTestsService;
  let httpService: HttpService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardReserveService],
      imports : [HttpModule, ThingsboardThingsboardUserModule, ThingsboardThingsboardTestsModule],
    }).compile();

    service = module.get(ThingsboardThingsboardReserveService);
    userService = module.get(ThingsboardThingsboardUserService);
    tests = module.get(ThingsboardThingsboardTestsService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('create reserve group -> return info', async () => {
    /*const login = await userService.login("reserveadmin@reserve.com", "reserve");
    expect(login.data.token).toBeDefined();
    service.setToken(login.data.token);
    console.log(await service.createReserveGroup("liamburgess299@gmail.com", "reserveb"));*/
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(await service.createReserveGroup("liamburgess299@gmail.com", "reserveb")).toMatchObject(tests.SuccessResponse);
  });

  it('create reserve group -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.createReserveGroup("liamburgess299@gmail.com", "reserveb")).toMatchObject(tests.ECONNResponse);
  });

  it('create reserve group -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.createReserveGroup("liamburgess299@gmail.com", "reserveb")).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('delete the reserve group -> return info', async () => {
    /*const Login = await service.login(username, password);
    console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));*/
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(tests.axiosTokenSuccessExample));
    expect(await service.deleteReserveGroup("573911a0-e5b2-11ec-a9e5-f30a5c07bcf3")).toMatchObject(tests.SuccessResponse);
  });

  it('delete the reserve group -> ECONNREFUSED', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.deleteReserveGroup("573911a0-e5b2-11ec-a9e5-f30a5c07bcf3")).toMatchObject(tests.ECONNResponse);
  });

  it('delete the reserve group -> HTTP ERROR', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.deleteReserveGroup("573911a0-e5b2-11ec-a9e5-f30a5c07bcf3")).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('reserve info -> return info', async () => {
    /*const Login = await service.login(username, password);
    console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));*/
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(await service.CustomerInfo("573911a0-e5b2-11ec-a9e5-f30a5c07bcf3")).toMatchObject(tests.SuccessResponse);
  });

  it('reserve info -> ECONNREFUSED', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.CustomerInfo("573911a0-e5b2-11ec-a9e5-f30a5c07bcf3")).toMatchObject(tests.ECONNResponse);
  });

  it('reserve info -> HTTP ERROR', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.CustomerInfo("573911a0-e5b2-11ec-a9e5-f30a5c07bcf3")).toMatchObject(tests.FailResponse);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('set perimeter -> return', async () => {
    /*const Login = await service.login(username, password);
    console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));*/
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(tests.axiosCustomerSuccessExample));
    expect(await service.setReservePerimeter("","","","","","","","","","","","",{})).toMatchObject(tests.SuccessResponse);
  });

  it('set perimeter -> ECONNREFUSED', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.setReservePerimeter("","","","","","","","","","","","",{})).toMatchObject(tests.ECONNResponse);
  });

  it('set perimeter -> HTTP ERROR', async () => {
    //const Login = await service.login(username, password);
    //console.log(await service.deleteReserveGroup(Login["data"]["token"], "573911a0-e5b2-11ec-a9e5-f30a5c07bcf3"));
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.setReservePerimeter("","","","","","","","","","","","",{})).toMatchObject(tests.FailResponse);
  });

});
