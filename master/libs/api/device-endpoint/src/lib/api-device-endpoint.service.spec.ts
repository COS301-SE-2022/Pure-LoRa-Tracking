import {
  ThingsboardThingsboardClientModule,
  ThingsboardThingsboardClientService,
} from '@lora/thingsboard-client';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiDeviceEndpointService } from './api-device-endpoint.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { ChirpstackChirpstackGatewayModule } from '@lora/chirpstack-gateway';
import { ChirpstackChirpstackSensorModule } from '@lora/chirpstack-sensor';
import { ApiApiTestingService, ApiApiTestingModule } from '@lora/api/testing';

const describeLive =
  process.env.PURELORABUILD == 'DEV' ? describe : describe.skip;

describe('ApiDeviceEndpointService', () => {
  let service: ApiDeviceEndpointService;
  let tests: ApiApiTestingService;
  let httpService: HttpService;
  let tbClient: ThingsboardThingsboardClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ThingsboardThingsboardClientModule,
        ChirpstackChirpstackGatewayModule,
        ChirpstackChirpstackSensorModule,
        ApiApiTestingModule,
      ],
      providers: [ApiDeviceEndpointService],
    }).compile();

    service = module.get(ApiDeviceEndpointService);
    httpService = module.get(HttpService);
    tests = module.get(ApiApiTestingService);
    tbClient = module.get(ThingsboardThingsboardClientService);

    process.env.TB_URL = 'http://127.0.0.1:9090';
    process.env.CHIRPSTACK_API =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should process device information and return the processed data', async () => {
    const bodyData = {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      deviceIDs: ['784f394c-42b6-435a-983c-b7beff2784f9'],
    };

    const response: AxiosResponse<any> = {
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

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const secondResponse = {
      data: {
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
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(secondResponse));

    const thirdResponse = {
      data: {
        data: [
          {
            id: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'DEVICE',
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
            name: 'A4B72CCDFF33',
            type: 'Temperature Sensor',
            label: 'Room 234 Sensor',
            deviceProfileId: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'DEVICE_PROFILE',
            },
            deviceData: {
              configuration: {},
              transportConfiguration: {},
            },
            firmwareId: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'OTA_PACKAGE',
            },
            softwareId: {
              id: '784f394c-42b6-435a-983c-b7beff2784f9',
              entityType: 'OTA_PACKAGE',
            },
            additionalInfo: {},
            customerTitle: 'string',
            customerIsPublic: false,
            deviceProfileName: 'string',
          },
        ],
        totalPages: 0,
        totalElements: 0,
        hasNext: false,
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(thirdResponse));

    const result = await service.processDeviceInfos(bodyData);

    console.log(result);
    expect(result).toBeDefined();
  });

  it('processDeviceInfos -> empty token', async () => {
    tests.deviceInfosExample.token = '';
    expect(
      await service.processDeviceInfos(tests.deviceInfosExample)
    ).toMatchObject({
      status: 401,
      explanation: 'no token found',
    });
  });

  it('processDeviceInfos -> success', async () => {
    jest.spyOn(tbClient, 'getDeviceInfos').mockImplementationOnce(() =>
      Promise.resolve({
        status: 'ok',
        explanation: 'call finished',
        data: [],
      })
    );
    expect(
      await service.processDeviceInfos(tests.deviceInfosExample)
    ).toMatchObject(tests.deviceInfosResponseExample);
  });

  it('processDeviceAddSensor -> empty token', async () => {
    tests.addSensorExampleInput.token = '';
    expect(
      await service.processDeviceAddsensor(tests.addSensorExampleInput)
    ).toMatchObject({
      status: 401,
      explanation: 'no token found',
    });
  });

  // it('should process a sensor device, add it to a specified reserve, and return a confirmation message', async () => {
  //   const bodyData = {
  //     token:
  //       'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
  //     customerID: '784f394c-42b6-435a-983c-b7beff2784f9',
  //     hardwareName: 'A4B72CCDFF33',
  //     labelName: 'Room 234 Sensor',
  //   };
  //   const result: AxiosResponse<any> = {
  //     data: {
  //       token:
  //         'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
  //       refreshToken:
  //         'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };

  //   const secondResult: AxiosResponse<any> = {
  //     data: {
  //       id: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'USER',
  //       },
  //       createdTime: 1609459200000,
  //       tenantId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'TENANT',
  //       },
  //       customerId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'CUSTOMER',
  //       },
  //       email: 'reserveAdmin@reserve.com',
  //       name: 'reserveAdmin@reserve.com',
  //       authority: 'TENANT_ADMIN',
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       additionalInfo: {},
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };

  //   const thirdResult: AxiosResponse<any> = {
  //     data: {
  //       id: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'CUSTOMER',
  //       },
  //       createdTime: 1609459200000,
  //       title: 'Company A',
  //       name: 'Company A',
  //       tenantId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'TENANT',
  //       },
  //       country: 'US',
  //       state: 'NY',
  //       city: 'New York',
  //       address: '42 Broadway Suite 12-400',
  //       address2: 'string',
  //       zip: '10004',
  //       phone: '+1(415)777-7777',
  //       email: 'reserveAdmin@reserve.com',
  //       additionalInfo: {},
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };
  //   const fourthResult: AxiosResponse<any> = {
  //     data: {
  //       id: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'DEVICE',
  //       },
  //       createdTime: 1609459200000,
  //       tenantId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'TENANT',
  //       },
  //       customerId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'CUSTOMER',
  //       },
  //       name: 'A4B72CCDFF33',
  //       type: 'Sensor',
  //       label: 'Room 234 Sensor',
  //       deviceProfileId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'DEVICE_PROFILE',
  //       },
  //       deviceData: {
  //         configuration: {},
  //         transportConfiguration: {},
  //       },
  //       firmwareId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'OTA_PACKAGE',
  //       },
  //       softwareId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'OTA_PACKAGE',
  //       },
  //       additionalInfo: {},
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };

  //   jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
  //   jest
  //     .spyOn(httpService, 'get')
  //     .mockImplementationOnce(() => of(secondResult));
  //   jest
  //     .spyOn(httpService, 'get')
  //     .mockImplementationOnce(() => of(thirdResult));
  //   jest
  //     .spyOn(httpService, 'post')
  //     .mockImplementationOnce(() => of(fourthResult));
  //   jest
  //     .spyOn(httpService, 'post')
  //     .mockImplementationOnce(() => of(fourthResult));

  //   const response = await service.processDeviceAddsensor(bodyData);
  //   console.log(response);
  //   expect(response).toEqual({
  //     status: 200,
  //     explanation: 'ok',
  //     data: '784f394c-42b6-435a-983c-b7beff2784f9',
  //   });
  // });

  // it('should process a gateway device, add it to a specified reserve, and return a confirmation message', async () => {
  //   const bodyData = {
  //     token:
  //       'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
  //     customerID: '784f394c-42b6-435a-983c-b7beff2784f9',
  //     hardwareName: 'A8B76FCDDF55',
  //     labelName: 'Reserve gateway',
  //   };
  //   const result: AxiosResponse<any> = {
  //     data: {
  //       token:
  //         'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
  //       refreshToken:
  //         'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };

  //   const secondResult: AxiosResponse<any> = {
  //     data: {
  //       id: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'USER',
  //       },
  //       createdTime: 1609459200000,
  //       tenantId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'TENANT',
  //       },
  //       customerId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'CUSTOMER',
  //       },
  //       email: 'reserveAdmin@reserve.com',
  //       name: 'reserveAdmin@reserve.com',
  //       authority: 'TENANT_ADMIN',
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       additionalInfo: {},
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };

  //   const thirdResult: AxiosResponse<any> = {
  //     data: {
  //       id: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'CUSTOMER',
  //       },
  //       createdTime: 1609459200000,
  //       title: 'Company A',
  //       name: 'Company A',
  //       tenantId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'TENANT',
  //       },
  //       country: 'US',
  //       state: 'NY',
  //       city: 'New York',
  //       address: '42 Broadway Suite 12-400',
  //       address2: 'string',
  //       zip: '10004',
  //       phone: '+1(415)777-7777',
  //       email: 'reserveAdmin@reserve.com',
  //       additionalInfo: {},
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };
  //   const fourthResult: AxiosResponse<any> = {
  //     data: {
  //       id: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'DEVICE',
  //       },
  //       createdTime: 1609459200000,
  //       tenantId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'TENANT',
  //       },
  //       customerId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'CUSTOMER',
  //       },
  //       name: 'A8B76FCDDF55',
  //       type: 'Gateway',
  //       label: 'Reserve gateway',
  //       deviceProfileId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'DEVICE_PROFILE',
  //       },
  //       deviceData: {
  //         configuration: {},
  //         transportConfiguration: {},
  //       },
  //       firmwareId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'OTA_PACKAGE',
  //       },
  //       softwareId: {
  //         id: '784f394c-42b6-435a-983c-b7beff2784f9',
  //         entityType: 'OTA_PACKAGE',
  //       },
  //       additionalInfo: {},
  //     },
  //     headers: {},
  //     config: {},
  //     status: 200,
  //     statusText: 'OK',
  //   };

  //   jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
  //   jest
  //     .spyOn(httpService, 'get')
  //     .mockImplementationOnce(() => of(secondResult));
  //   jest
  //     .spyOn(httpService, 'get')
  //     .mockImplementationOnce(() => of(thirdResult));
  //   jest
  //     .spyOn(httpService, 'post')
  //     .mockImplementationOnce(() => of(fourthResult));
  //   jest
  //     .spyOn(httpService, 'post')
  //     .mockImplementationOnce(() => of(fourthResult));

  //   const response = await service.processDeviceAddsensor(bodyData);
  //   console.log(response);
  //   expect(response).toEqual({
  //     status: 200,
  //     explanation: 'ok',
  //     data: '784f394c-42b6-435a-983c-b7beff2784f9',
  //   });
  // });

  it('should remove a given device from a specified reserve and return a specified message.', async () => {
    const bodyData = {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIi...',
      deviceID: '784f394c-42b6-435a-983c-b7beff2784f9',
    };

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

    const secondResult: AxiosResponse<any> = {
      data: {
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
        email: 'reserveAdmin@reserve.com',
        name: 'reserveAdmin@reserve.com',
        authority: 'TENANT_ADMIN',
        firstName: 'John',
        lastName: 'Doe',
        additionalInfo: {},
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    const thirdResult: AxiosResponse<any> = {
      data: {},
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() => of(secondResult));
    jest
      .spyOn(httpService, 'delete')
      .mockImplementationOnce(() => of(thirdResult));

    // const resp = await service.processDeviceremove(bodyData);
    // console.log(resp);
    // expect(resp).toEqual({ status: 200, explanation: 'ok', data: undefined });
  });

  ///////////////////////////////////////////////////////////////////////////////
  it('should process the gateway list and return their locations', async () => {
    /*const testInput = {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3MDMyNzcsImV4cCI6MTY1NDcxMjI3N30.9PTeASiluMvW0NOi_FiAZiR17-dUMooWNqb_Xys5iiGBGtfHKWyOyGZiEF1Xj9ItkDY97ohQ13yCsAnzJ8c9-w',
      deviceIDs: ['2fe67850-dfe9-11ec-bdb3-750ce7ed2451'],
    };

    console.log(await service.processGatewayGetLocationInfo(testInput));*/
  });

  ///////////////////////////////////////////////////////////////////////////////
  it('should process the gateway list and return their locations', async () => {
    const testInput = {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW5AcmVzZXJ2ZS5jb20iLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInVzZXJJZCI6ImQ2MzcyZTMwLWRmZTgtMTFlYy1iZGIzLTc1MGNlN2VkMjQ1MSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJjZDJkZjJiMC1kZmU4LTExZWMtYmRiMy03NTBjZTdlZDI0NTEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2NTQ3MDcxODgsImV4cCI6MTY1NDcxNjE4OH0.ANHDlH4zU3JG8743lMCCRD5N86pzSBOoQB0pxdq_KZgBmzacC5N0l91ZjKZZxi7f6r2BL-JXc5WWsArS-qe04Q',
      deviceID: '2fe67850-dfe9-11ec-bdb3-750ce7ed2451',
      locationParameters: [
        {
          latitude: 23,
          longitude: 22,
        },
        {
          latitude: 21,
          longitude: 22,
        },
        {
          latitude: 23.56,
          longitude: 24.25,
        },
      ],
    };
    //console.log(await service.processGatewaySetLocation(testInput));
  });

  // export interface AddSensorDevice {
  //   token: string;
  //   customerID: string;
  //   hardwareName: string;
  //   labelName: string;
  //   deviceProfileId: string;
  //   profileType?: SensorProfile;
  //   extraParams?: any;
  // }
  describeLive('ApiDeviceEndpointService Live', () => {
    it('should should add a sensor', async () => {
      const tbToken = await tbClient.loginUserReturnToken(
        'reserveadmin@reserve.com',
        'reserve'
      );
      process.env.CHIRPSTACK_API =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';

      const result = await service.processDeviceAddsensor({
        token: tbToken.Token,
        customerID: 'ef55ff40-dfe8-11ec-bdb3-750ce7ed2451',
        hardwareName: '70b3d5705000dfb1',
        labelName: 'new_sensor_test2',
        deviceProfileId: 'cb71e932-cd57-44a0-b5ab-aebb6b377541',
      });

      console.log(result);

      expect(result.status).toBe(200);
      expect(result.explanation).toBe('ok');
    });

    it('should should delete a sensor', async () => {
      const tbToken = await tbClient.loginUserReturnToken(
        'reserveadmin@reserve.com',
        'reserve'
      );
      process.env.CHIRPSTACK_API =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';

      const result = await service.processDeviceremove({
        token: tbToken.Token,
        deviceID: 'f52a0480-e7f8-11ec-9cbe-a5b859dcff2c',
        isGateway: false,
        devEUI: '70b3d5705000dfb1',
      });

      console.log(result);
      expect(result).toStrictEqual({
        explanation: 'device deletion failed',
        status: 400,
      });
    });

    it('should should add a gateway', async () => {
      const tbToken = await tbClient.loginUserReturnToken(
        'reserveadmin@reserve.com',
        'reserve'
      );
      process.env.CHIRPSTACK_API =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';

      const result = await service.processDeviceAddGateway({
        token: tbToken.Token,
        customerID: 'ef55ff40-dfe8-11ec-bdb3-750ce7ed2451',
        hardwareName: '353036203a001015',
        labelName: 'new_gateway_test2',
      });
      console.log(result);
    });
    // });
    it('should should delete a gateway', async () => {
      const tbToken = await tbClient.loginUserReturnToken(
        'reserveadmin@reserve.com',
        'reserve'
      );
      process.env.CHIRPSTACK_API =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';

      const result = await service.processDeviceremove({
        token: tbToken.Token,
        deviceID: 'f52a0480-e7f8-11ec-9cbe-a5b859dcff2c',
        isGateway: false,
        devEUI: '70b3d5705000dfb1',
      });
      console.log(result);
      expect(result).toStrictEqual({
        explanation: 'device deletion failed',
        status: 400,
      });
    });
  });

  /*it('should set gateway location -> mock', async () => {
    service.processGatewaySetLocation({
      deviceID: '2c49b520-084f-11ed-bc6e-a50062f6cdba',
      locationParameters: {
        latitude: -25.800973027864043,
        longitude: 28.19984436035156,
      },
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZlYWRtaW50d29AcmVzZXJ2ZS5jb20iLCJ1c2VySWQiOiI5ZmYwZmFhMC0wODQxLTExZWQtYmM2ZS1hNTAwNjJmNmNkYmEiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU4MzM3MDMwLCJleHAiOjE2NTgzNDYwMzAsImZpcnN0TmFtZSI6InJlc2VydmUgYWRtaW4iLCJsYXN0TmFtZSI6InR3byIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI4ZjkxOGFkMC0wODQxLTExZWQtYmM2ZS1hNTAwNjJmNmNkYmEiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.e_r_ek2gTBfRW_sga2c4fR--Yos1euDtqM9d9mGk7L8fj2dK5F4II5Jh-En8xtbMfCSFaD_WoWmjKHqcpPdTXA',
    });
  });*/
});
