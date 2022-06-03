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
  const username = "reserveAdmin@reserve.com";
  const password = "reserve";
  

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardDeviceService],
      imports: [HttpModule, ThingsboardThingsboardUserModule],
    }).compile();

    service = module.get(ThingsboardThingsboardDeviceService);
    loginService = module.get(ThingsboardThingsboardUserService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get the device infos and print them...', async()=> {
    /*const data = await loginService.login(username, password);
    service.setToken(data['data']['token']);
    const userinfo = await loginService.userInfo(data['data']['token']);
    const custID = userinfo['data']['customerId']['id'];
    expect(custID).toBeDefined();
    const DeviceData = await service.getCustomerDevices(0, 5, custID);
    console.log(service.processDevices(DeviceData['data']['data']));*/
  })

  it('should create a device and return status 200', async ()=> {
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

    jest.spyOn(httpService, 'delete').mockImplementationOnce(() => of(result));
    const deviceID = "fa0097e0-dfaa-11ec-b99c-f7477a3db362";
    expect(await service.deleteDevice(deviceID)).toEqual(true);
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
    expect(await service.assignDevicetoCustomer(custID, deviceID)).toEqual(true);
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
  })
});
