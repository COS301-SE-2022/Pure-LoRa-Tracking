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
});
