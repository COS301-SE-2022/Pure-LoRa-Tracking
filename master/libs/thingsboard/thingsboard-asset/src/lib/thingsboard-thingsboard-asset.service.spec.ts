import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { ThingsboardThingsboardAssetService } from './thingsboard-thingsboard-asset.service';
import { AxiosResponse } from 'axios';

describe('ThingsboardThingsboardAssetService', () => {
  let service: ThingsboardThingsboardAssetService;
  let UserService : ThingsboardThingsboardUserService;
  let httpService : HttpService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports : [HttpModule, ThingsboardThingsboardUserModule],
      providers: [ThingsboardThingsboardAssetService],
    }).compile();

    service = module.get(ThingsboardThingsboardAssetService);
    UserService = module.get(ThingsboardThingsboardUserService);
    httpService = module.get(HttpService);

    /*const data = await UserService.login("reserveuser@reserve.com", "reserve");
    service.setToken(data['data']['token']);*/
  });

  it('should return asset information', async() => {
    const result : AxiosResponse<any> = {
      "data":{
        "data": [
            {
                "id": {
                    "entityType": "ASSET",
                    "id": "6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39"
                },
                "createdTime": 1654106728765,
                "additionalInfo": {
                    "description": ""
                },
                "tenantId": {
                    "entityType": "TENANT",
                    "id": "cd2df2b0-dfe8-11ec-bdb3-750ce7ed2451"
                },
                "customerId": {
                    "entityType": "CUSTOMER",
                    "id": "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451"
                },
                "name": "Reserve A",
                "type": "Reserve",
                "label": null
            }
        ],
        "totalPages": 1,
        "totalElements": 1,
        "hasNext": false
      }, 
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    }

    jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(() => of(result))

    console.log(await service.getAssetIDs("ef55ff40-dfe8-11ec-bdb3-750ce7ed2451"));
    
  })

  it('should get the reserve perimeter information', async() => {
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

    console.log(await service.getReservePerimeter("6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39"))
  })

});

const mockAssetIDCall = {
  "data": [
      {
          "id": {
              "entityType": "ASSET",
              "id": "6b641ed0-e1d5-11ec-a9b6-bbb9bad3df39"
          },
          "createdTime": 1654106728765,
          "additionalInfo": {
              "description": ""
          },
          "tenantId": {
              "entityType": "TENANT",
              "id": "cd2df2b0-dfe8-11ec-bdb3-750ce7ed2451"
          },
          "customerId": {
              "entityType": "CUSTOMER",
              "id": "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451"
          },
          "name": "Reserve A",
          "type": "Reserve",
          "label": null
      }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "hasNext": false
}

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
