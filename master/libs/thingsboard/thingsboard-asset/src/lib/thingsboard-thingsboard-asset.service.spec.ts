import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { ThingsboardThingsboardAssetService } from './thingsboard-thingsboard-asset.service';
import { AxiosResponse } from 'axios';
import { ThingsboardThingsboardTestsModule, ThingsboardThingsboardTestsService } from '@lora/thingsboard/tests';

describe('ThingsboardThingsboardAssetService', () => {
  let service : ThingsboardThingsboardAssetService;
  let UserService : ThingsboardThingsboardUserService;
  let httpService : HttpService;
  let tests : ThingsboardThingsboardTestsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports : [HttpModule, ThingsboardThingsboardUserModule, ThingsboardThingsboardTestsModule],
      providers: [ThingsboardThingsboardAssetService],
    }).compile();

    service = module.get(ThingsboardThingsboardAssetService);
    UserService = module.get(ThingsboardThingsboardUserService);
    httpService = module.get(HttpService);
    tests = module.get(ThingsboardThingsboardTestsService);
  });

  ///////////////////////////////////////////////////////////////////////////

  it('get assets -> return info', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(tests.axiosAssetsSuccessExample));
    expect(await service.getAssetIDs("acf22a00-ce06-11ec-b2d0-bd829ba84846")).toMatchObject(tests.SuccessResponse);
  });

  it('get assets -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.getAssetIDs("acf22a00-ce06-11ec-b2d0-bd829ba84846")).toMatchObject(tests.ECONNResponse);
  });

  it('get assets  -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.getAssetIDs("acf22a00-ce06-11ec-b2d0-bd829ba84846")).toMatchObject(tests.FailResponse);
  });

  ///////////////////////////////////////////////////////////////////////////

  /*it('get perimeter -> return info', async() => {
    const result : AxiosResponse<any> = {
      data:[mockReservePerimeterCall], 
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    }

    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(result))

    expect(await service.getReservePerimeter("6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39")).toMatchObject(mockReservePerimeterCall)
  })

  it('get perimeter -> ECONNREFUSED', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosECONNFailureExample));
    expect(await service.getReservePerimeter("6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39")).toMatchObject({
      code: 500,
      status: 'failure',
      explanation: 'connection failure',
    });
  });

  it('get perimeter  -> HTTP ERROR', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axiosFailureExample));
    expect(await service.getReservePerimeter("6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39")).toMatchObject({
      code: 400,
      status: 'failure',
      explanation: 'server failure',
    });
  });

  it('get perimeter  -> HTTP ERROR 401', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axios401FailureExample));
    expect(await service.getReservePerimeter("6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39")).toMatchObject({
      code: 401,
      status: 'permissions',
      explanation: 'credentials not correct for this action',
    });
  });


  it('get perimeter  -> HTTP ERROR 404', async () => {
    //const data = await loginService.login(tests.user, tests.userPassword);
    //service.setToken(data.token);
    service.setToken('token')
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => tests.axios404FailureExample));
    expect(await service.getReservePerimeter("6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39")).toMatchObject({
      code: 404,
      status: 'not found',
      explanation: 'no reserve set',
    });
  });*/

  ///////////////////////////////////////////////////////////////////////////

  it('process assets -> return info', async () => {
    expect(service.processAssetIDS(tests.axiosAssetsSuccessExample.data)).toMatchObject([
      {
        name: 'Empire State Building',
        type: 'Building',
        EntityID: '784f394c-42b6-435a-983c-b7beff2784f9'
      }
    ])
  });

  it('process assets -> []', async () => {
    expect(service.processAssetIDS(undefined)).toMatchObject([
    ])

    expect(service.processAssetIDS(null)).toMatchObject([
    ])
  });


});

const mockReservePerimeterCall = {
  "lastUpdateTs": 1654150471642,
  "key": "reservePerimeter",
  "value": {
      "reserveName": "UP",
      "center": {
          "latitude": "-25.755123",
          "longitude": "28.231999"
      },
      "location": [
          {
              "latitude": "-25.753785",
              "longitude": "28.231703"
          },
          {
              "latitude": "-25.755650",
              "longitude": "28.230737"
          },
          {
              "latitude": "-25.757089",
              "longitude": "28.233456"
          },
          {
              "latitude": "-25.756385",
              "longitude": "28.236474"
          },
          {
              "latitude": "-25.754765",
              "longitude": "28.235663"
          }
      ]
  }
}
