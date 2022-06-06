import { ThingsboardThingsboardAssetModule } from '@lora/thingsboard-asset';
import { ThingsboardThingsboardDeviceModule } from '@lora/thingsboard-device';
import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardUserModule } from '@lora/thingsboard-user';
import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

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

  /* TODO Mock test */
  it('should return the customer devices by filter', async () => {
    /*expect(await service.loginUser("reserveuser@reserve.com", "reserve")).toBe(true);
    console.log(await service.getDeviceInfos([{deviceID: '25c31a40-dfe9-11ec-bdb3-750ce7ed2451'}]));*/
  });

  //////////////////////////////////////////////////////////////////////
  it('should create and assign the device', async () => {
    /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
      true
    );
    console.log(
      await service.addDeviceToReserve('ef55ff40-dfe8-11ec-bdb3-750ce7ed2451', {
        hardwareID: 'mc544',
        isGateway: false,
        labelName: 'Giraffe',
      }))*/
  });

  it('should create and assign the device', async () => {
      /*expect(await service.loginUser('reserveadmin@reserve.com', 'reserve')).toBe(
        true
      );
      console.log(await service.RemoveDeviceFromReserve("a7971100-e581-11ec-a9e5-f30a5c07bcf3"))*/
  });

});
