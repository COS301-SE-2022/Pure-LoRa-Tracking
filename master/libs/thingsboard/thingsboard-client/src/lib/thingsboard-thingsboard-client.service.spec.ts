import { ThingsboardThingsboardAssetModule } from '@lora/thingsboard-asset';
import { ThingsboardThingsboardDeviceModule } from '@lora/thingsboard-device';
import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardUserModule } from '@lora/thingsboard-user';
import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import exp = require('constants');

describe('ThingsboardThingsboardClientService', () => {
  let service: ThingsboardThingsboardClientService;
  let httpService: HttpService;
  const username = 'reserveAdmin@reserve.com';
  const password = 'reserve';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardClientService],
      imports: [
        ThingsboardThingsboardUserModule,
        ThingsboardThingsboardTelemetryModule,
        ThingsboardThingsboardDeviceModule,
        ThingsboardThingsboardAssetModule,
      ],
    }).compile();

    service = module.get(ThingsboardThingsboardClientService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should login, acquire userID and print device list from ID', async () => {
    const custID = "784f394c-42b6-435a-983c-b7beff2784f9";
    const result: AxiosResponse<any> = {
      data: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    expect(await service.loginUser(username, password)).toEqual(true);
    result.data = {
        "data": [
          {
            "id": {
              "id": "784f394c-42b6-435a-983c-b7beff2784f9",
              "entityType": "DEVICE"
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
            "name": "A4B72CCDFF33",
            "type": "Temperature Sensor",
            "label": "Room 234 Sensor",
            "deviceProfileId": {
              "id": "784f394c-42b6-435a-983c-b7beff2784f9",
              "entityType": "DEVICE_PROFILE"
            },
            "deviceData": {
              "configuration": {},
              "transportConfiguration": {}
            },
            "firmwareId": {
              "id": "784f394c-42b6-435a-983c-b7beff2784f9",
              "entityType": "OTA_PACKAGE"
            },
            "softwareId": {
              "id": "784f394c-42b6-435a-983c-b7beff2784f9",
              "entityType": "OTA_PACKAGE"
            },
            "additionalInfo": {},
            "customerTitle": "string",
            "customerIsPublic": false,
            "deviceProfileName": "string"
          }
        ],
        "totalPages": 0,
        "totalElements": 0,
        "hasNext": false
      }

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const resp = await service.getCustomerDevices(custID);
    console.log(resp);
    expect(resp).toBeDefined();
  });

  it('should return the reserve perimeter for the reserve user', async () => {
    const result: AxiosResponse<any> = {
      data: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    await service.loginUser(username, password);

    result.data = {
      id: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'USER',
      },
      createdTime: 1609459200000,
      tenantId: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'TENANT',
      },
      customerId: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'CUSTOMER',
      },
      email: 'reserveuser@reserve.com',
      name: 'reserveuser@reserve.com',
      authority: 'TENANT_ADMIN',
      firstName: 'John',
      lastName: 'Doe',
      additionalInfo: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    expect(await service.getReservePerimeter()).toBeDefined();
  });

  it('should return the telemetry for the deviceID given', async () => {
    const result: AxiosResponse<any> = {
      data: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    await service.loginUser(username, password);

    result.data = {
      id: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'USER',
      },
      createdTime: 1609459200000,
      tenantId: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'TENANT',
      },
      customerId: {
        id: '784f394c-42b6-435a-983c-b7beff2784f9',
        entityType: 'CUSTOMER',
      },
      email: 'reserveuser@reserve.com',
      name: 'reserveuser@reserve.com',
      authority: 'TENANT_ADMIN',
      firstName: 'John',
      lastName: 'Doe',
      additionalInfo: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    //console.log(await service.getDeviceHistoricalData("25c31a40-dfe9-11ec-bdb3-750ce7ed2451", 0, 1654072587463));
    expect(
      await service.getDeviceHistoricalData(
        '25c31a40-dfe9-11ec-bdb3-750ce7ed2451',
        0,
        1654072587463
      )
    ).toBeDefined();
  });

  
  it('should return the customer devices by filter', async () => {
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
    expect(await service.loginUser(username, password)).toBe(true);

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
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

    const secondResult = {
      data: {
      "data": [
        {
          "id": {
            "id": "784f394c-42b6-435a-983c-b7beff2784f9",
            "entityType": "DEVICE"
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
          "name": "A4B72CCDFF33",
          "type": "Temperature Sensor",
          "label": "Room 234 Sensor",
          "deviceProfileId": {
            "id": "784f394c-42b6-435a-983c-b7beff2784f9",
            "entityType": "DEVICE_PROFILE"
          },
          "deviceData": {
            "configuration": {},
            "transportConfiguration": {}
          },
          "firmwareId": {
            "id": "784f394c-42b6-435a-983c-b7beff2784f9",
            "entityType": "OTA_PACKAGE"
          },
          "softwareId": {
            "id": "784f394c-42b6-435a-983c-b7beff2784f9",
            "entityType": "OTA_PACKAGE"
          },
          "additionalInfo": {},
          "customerTitle": "string",
          "customerIsPublic": false,
          "deviceProfileName": "string"
        }
      ],
      "totalPages": 0,
      "totalElements": 0,
      "hasNext": false
    },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
  }
      

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(secondResult));
    const deviceInfos = await service.getDeviceInfos(['25c31a40-dfe9-11ec-bdb3-750ce7ed2451']);
    console.log(deviceInfos);
    expect(deviceInfos).toBeDefined();
  });

  //////////////////////////////////////////////////////////////////////
  it('should create and assign the device', async () => {
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

    const secondResult: AxiosResponse<any> = {
      data : {
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
        "email": "user@example.com",
        "name": "user@example.com",
        "authority": "TENANT_ADMIN",
        "firstName": "John",
        "lastName": "Doe",
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    const thirdResult: AxiosResponse<any> = {
      data: {
        "id": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "CUSTOMER"
        },
        "createdTime": 1609459200000,
        "title": "Company A",
        "name": "Company A",
        "tenantId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT"
        },
        "country": "US",
        "state": "NY",
        "city": "New York",
        "address": "42 Broadway Suite 12-400",
        "address2": "string",
        "zip": "10004",
        "phone": "+1(415)777-7777",
        "email": "example@company.com",
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }
    const fourthResult: AxiosResponse<any> = {
      data: {
        "id": {
          "id": "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
          "entityType": "DEVICE"
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
        "name": "mc544",
        "type": "Temperature Sensor",
        "label": "Giraffe",
        "deviceProfileId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "DEVICE_PROFILE"
        },
        "deviceData": {
          "configuration": {},
          "transportConfiguration": {}
        },
        "firmwareId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "OTA_PACKAGE"
        },
        "softwareId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "OTA_PACKAGE"
        },
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    expect(await service.loginUser(username, password)).toBe(
      true
    );

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(secondResult));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(thirdResult));
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(fourthResult));
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(fourthResult));

    const resp = await service.addDeviceToReserve('ef55ff40-dfe8-11ec-bdb3-750ce7ed2451', {
      hardwareID: 'mc544',
      isGateway: false,
      labelName: 'Giraffe',
    });
    console.log(resp);
    expect(resp).toEqual({ status: 'ok', data: 'ef55ff40-dfe8-11ec-bdb3-750ce7ed2451' })
  });


  it('should unassign a given device from the specified reserve', async () => {
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

    const secondResult: AxiosResponse<any> = {
      data : {
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
        "email": "user@example.com",
        "name": "user@example.com",
        "authority": "TENANT_ADMIN",
        "firstName": "John",
        "lastName": "Doe",
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    const thirdResult: AxiosResponse<any> = {
      data: {},
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    expect(await service.loginUser(username, password)).toBe(
      true
    );

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(secondResult));
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(thirdResult));

    const resp = await service.RemoveDeviceFromReserve("a7971100-e581-11ec-a9e5-f30a5c07bcf3");
    console.log(resp);      
    expect(resp).toEqual({ status: 'ok', explanation: 'call finished' });
    
  //////////////////////////////////////////////////////////////////////

  //it('should create and assign the device', async () => {
      /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
        true
      );
      console.log(await service.RemoveDeviceFromReserve("a7971100-e581-11ec-a9e5-f30a5c07bcf3"))*/

  });

  //////////////////////////////////////////////////////////////////////

  it('should create and assign the user the user to the reserve', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.addUserToReserve("ef55ff40-dfe8-11ec-bdb3-750ce7ed2451", "lb@g.com","l", "b"));*/
    
  });

  //////////////////////////////////////////////////////////////////////

  it('should create and assign the user the user to the reserve', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(await service.removeReserveUser("cf0afc80-e63d-11ec-9a49-9105980e5c8a"));*/
    
  });

});
