import { ThingsboardThingsboardUserModule, ThingsboardThingsboardUserService } from '@lora/thingsboard-user';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardDeviceService } from './thingsboard-thingsboard-device.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('ThingsboardThingsboardDeviceService', () => {
  let service: ThingsboardThingsboardDeviceService;
  let loginService: ThingsboardThingsboardUserService;
  let httpService: HttpService;
  const username = "reserveadmin@reserve.com";
  const password = "reserve";
  

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardDeviceService],
      imports: [HttpModule, ThingsboardThingsboardUserModule],
    }).compile();

    service = module.get(ThingsboardThingsboardDeviceService);
    loginService = module.get(ThingsboardThingsboardUserService);
    httpService = module.get(HttpService);
    service.setToken("token")
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get the device infos and print them...', async () => {
    const result: AxiosResponse<any> = {
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
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const custID = "784f394c-42b6-435a-983c-b7beff2784f9";
    expect(await service.getCustomerDevices(0,5,custID)).toBeDefined();
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    const userinfo = await loginService.userInfo(data['data']['token']);
    const custID = userinfo['data']['customerId']['id'];
    expect(custID).toBeDefined();
    const DeviceData = await service.getCustomerDevices(0, 5, custID);
    console.log(service.processDevices(DeviceData['data']['data']));*/
  })

  it('should create a device and return status 200', async () => {
    const result: AxiosResponse<any> = {
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
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const hardwareID = "123";
    const deviceLabel = "testingSensor";
    expect(await (await service.createDevice(hardwareID, deviceLabel, false)).data.customerId.id).toEqual("784f394c-42b6-435a-983c-b7beff2784f9");
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    expect(await service.createDevice('123', 'testingSensor', false)).toEqual(true);*/
  })

  it('should delete the target device and return status 200', async () => {
    const result: AxiosResponse<any> = {
      data: {},
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'delete').mockImplementation(() => of(result));
    const deviceID = "fa0097e0-dfaa-11ec-b99c-f7477a3db362";
    const response=await service.deleteDevice(deviceID);
    expect(response.status).toEqual(200);
    expect(response.explanation).toEqual("ok");
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    expect(await service.deleteDevice("8e4fcc90-dc0e-11ec-931b-3544ea43758e")).toEqual(true);*/
  })

  it('should assign the specified device to the specified customer and return status 200', async () => {
    const result: AxiosResponse<any> = {
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
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));
    const custID = "784f394c-42b6-435a-983c-b7beff2784f9";
    const deviceID = "fa0097e0-dfaa-11ec-b99c-f7477a3db362";
    const response=await service.assignDevicetoCustomer(custID, deviceID);
    expect(response.status).toEqual(200);
    expect(response.explanation).toEqual("ok");
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    expect(await service.assignDevicetoCustomer("9fed2a30-dfa9-11ec-b99c-f7477a3db362", "fa0097e0-dfaa-11ec-b99c-f7477a3db362")).toEqual(true);*/
  })

  it('should unassign the specified device from the specified customer and return status 200', async () => {
    const result: AxiosResponse<any> = {
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
        "additionalInfo": {}
      },
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    }
    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(result));
    const deviceID = "fa0097e0-dfaa-11ec-b99c-f7477a3db362";
    expect(await service.removeDeviceFromCustomer(deviceID)).toEqual(true);
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    expect(await service.removeDeviceFromCustomer("fa0097e0-dfaa-11ec-b99c-f7477a3db362")).toEqual(true);*/
  });

  it('should get device profiles and return null, tentatively.', async () => {
    expect(await service.getDeviceProfiles()).toEqual(null);
  });

  it('should process a list of device profiles and return null, tentatively.', async () => {
    expect(await service.processDeviceProfiles([])).toEqual(null);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('should set the gateway location', async () => {
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    console.log(await service.setGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451", [
      {latitude : -25, longitude : 23},
      {latitude : -25.2, longitude : 21}
    ]))*/
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('should set the gateway location', async () => {
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    console.log(await service.GetGatewayLocation("2fe67850-dfe9-11ec-bdb3-750ce7ed2451"));*/
  });

  ///////////////////////////////////////////////////////////////////////////////////////////

  it('should get the device access token', async () => {
   /* const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    console.log(await service.GetAccessToken("2fe67850-dfe9-11ec-bdb3-750ce7ed2451"));*/
  });

});
