import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { deviceInfos } from '@master/shared-interfaces';

describe('ApiDeviceEndpointService', () => {
  let service: ApiDeviceEndpointService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports :[ThingsboardThingsboardClientModule],
      providers: [ApiDeviceEndpointService],
    }).compile();

    service = module.get(ApiDeviceEndpointService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should process device information and return the processed data', async () => {
    const bodyData = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...",
      deviceIDs: ["784f394c-42b6-435a-983c-b7beff2784f9"]
    }

    const response: AxiosResponse<any> = {
      data: {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...",
        "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi..."
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const secondResponse = {
      data: {
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
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(secondResponse));

    const thirdResponse = {
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
      
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(thirdResponse));

    const result = await service.processDeviceInfos(bodyData);

    console.log(result);
    expect(result).toBeDefined();
  });

  it('should process a device, add it to a specified reserve, and return a confirmation message', async () =>{
    const bodyData = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...",
      customerID: "784f394c-42b6-435a-983c-b7beff2784f9",
      hardwareName: "A4B72CCDFF33",
      labelName: "Room 234 Sensor",
    }
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
        "type": "Sensor",
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
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(secondResult));
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(thirdResult));
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(fourthResult));
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(fourthResult));

    const response = await service.processDeviceAddsensor(bodyData);
    console.log(response);
    expect(response).toBeDefined();
  });

});
