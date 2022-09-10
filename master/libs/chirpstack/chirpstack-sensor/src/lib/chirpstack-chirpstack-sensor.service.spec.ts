import { Test } from '@nestjs/testing';
import { ChirpstackChirpstackSensorService } from './chirpstack-chirpstack-sensor.service';
import * as deviceMessages from '@chirpstack/chirpstack-api/as/external/api/device_pb';
import { DeviceProfile } from '@chirpstack/chirpstack-api/as/external/api/profiles_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { DeviceProfileListItem, GetDeviceProfileResponse, ListDeviceProfileResponse } from '@chirpstack/chirpstack-api/as/external/api/deviceProfile_pb';

const describeLive = process.env.PURELORABUILD == 'DEV' ? describe : describe.skip;


describe('ChirpstackChirpstackSensorService', () => {
  let service: ChirpstackChirpstackSensorService;
  let authtoken: string;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChirpstackChirpstackSensorService],
      imports: [],
    }).compile();

    await module.init()
    service = module.get(ChirpstackChirpstackSensorService);
    authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('manage devices', () => {
    //tests will only work if thingsboard is already configured
    it('should list devices', async () => {
      // Inputs
      // Output
      const response = new deviceMessages.ListDeviceResponse();

      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.deviceServiceClient, 'list')
        .mockImplementationOnce((listDeviceRequest, metadata, callback: any) => {
          callback(null, response);
          return null;
        });

      const data = await service.listDevices(authtoken);
      
      expect(data).toBe(response);

      jest
        .spyOn(service.deviceServiceClient, 'list')
        .mockImplementationOnce((listDeviceRequest, metadata, callback: any) => {
          callback("TEST_ERROR", null);
          return null;
        });

      await expect(service.listDevices(authtoken)).rejects.toEqual("TEST_ERROR");
    });

    it('should get profile details', async () => {
      // Mock data
      const mockDevProfile_1 = new DeviceProfile();
      mockDevProfile_1.setId('70b3d5000000000b');
      // Inputs
      const profileId = 'test';
      // Output
      const response = new GetDeviceProfileResponse();
      response.setDeviceProfile(mockDevProfile_1);

      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.deviceProfileServiceClient, 'get')
        .mockImplementationOnce(
          (getDeviceProfileRequest, metadata, callback: any) => {
            expect(getDeviceProfileRequest.getId()).toBe(profileId);
            callback(null, response);
            return null;
          }
        );

      const data = await service.getProfileDetail(authtoken, profileId);
      expect(data).toBe(mockDevProfile_1);

      jest
        .spyOn(service.deviceProfileServiceClient, 'get')
        .mockImplementationOnce(
          (getDeviceProfileRequest, metadata, callback: any) => {
            callback("TEST_ERROR", null);
            return null;
          }
        );

      await expect(service.getProfileDetail(authtoken, profileId)).rejects.toEqual("TEST_ERROR");
    });

    
    it('should get device profiles', async () => {
      // Mock data
      const mockDevProfile_1 = new DeviceProfile();
      mockDevProfile_1.setId('70b3d5000000000b');
      const mockListDevProfile = new ListDeviceProfileResponse();
      const mockListDevProfileItem = new DeviceProfileListItem();
      mockListDevProfileItem.setId('70b3d5000000000b');
      mockListDevProfile.setResultList([mockListDevProfileItem]);
      // Inputs
      // Output
      const response = [mockDevProfile_1];

      // We need to mock getProfileDetail so we only test getProfiles() here
      jest
        .spyOn(service, 'getProfileDetail')
        .mockImplementationOnce((authtoken, profileId) => {
          const subResponse = new Promise<DeviceProfile>((res, rej) => {
            res(mockDevProfile_1);
          });
          return subResponse;
        });

      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.deviceProfileServiceClient, 'list')
        .mockImplementationOnce(
          (listDeviceRequest, metadata, callback: any) => {
            callback(null, mockListDevProfile);
            return null;
          }
        );

      const data = await service.getProfiles(authtoken);
      expect(data).toStrictEqual(response);

      jest
        .spyOn(service.deviceProfileServiceClient, 'list')
        .mockImplementationOnce((listDeviceRequest, metadata, callback: any) => {
          callback("TEST_ERROR", null);
          return null;
        });

      await expect(service.getProfiles(authtoken)).rejects.toEqual("TEST_ERROR"); 
    });


    it('should add a device', async () => {
      // Inputs
      const sensorName = 'test';
      const sensorEUI = '70b3d5000000000b';
      const deviceProfId = 'cb71e932-cd57-44a0-b5ab-aebb6b377541';
      // Output
      const response = new Empty();

      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.deviceServiceClient, 'create')
        .mockImplementationOnce((createDeviceRequest, metadata, callback: any) => {
          expect(createDeviceRequest.getDevice()).toBeInstanceOf(deviceMessages.Device);
          expect(createDeviceRequest.getDevice().getDevEui()).toBe(sensorEUI);
          expect(createDeviceRequest.getDevice().getName()).toBe(sensorName);
          expect(createDeviceRequest.getDevice().getDeviceProfileId()).toBe(deviceProfId);
          callback(null, response);
          return null;
        });
      const data = await service.addDevice(
        authtoken,
        '25c31a40-dfe9-11ec-bdb3-750ce7ed2451',
        sensorName,
        sensorEUI,
        deviceProfId
      );
      
      expect(data).toBe(response);

      jest
        .spyOn(service.deviceServiceClient, 'create')
        .mockImplementationOnce((createDeviceRequest, metadata, callback: any) => {
          callback("TEST_ERROR", null);
          return null;
        });

      await expect(service.addDevice(null,null,null,null,null)).rejects.toEqual("TEST_ERROR"); 
    });


    it('should remove a devices', async () => {
      // Inputs
      const sensorEUI = '70b3d5000000000b';
      // Output
      const response = new Empty();
      
      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.deviceServiceClient, 'delete')
        .mockImplementationOnce((deleteDeviceRequest, metadata, callback: any) => {
          expect(deleteDeviceRequest.getDevEui()).toBe(sensorEUI);
          callback(null, response);
          return null;
        });

      const data = await service.removeDevice(
        authtoken,
        sensorEUI
      );
      
      expect(data).toBe(response);
    });
  });

  describeLive('manage devices live', () => {
    //tests will only work if thingsboard is already configured
    it('should list devices', async () => {
      const data = await service.listDevices(authtoken);
      console.log(data);
      expect(data).toBeInstanceOf(deviceMessages.ListDeviceResponse);
    });

    it('should get device profiles', async () => {
      const data = await service.getProfiles(authtoken);
      console.log(data);

      expect(data).toBeDefined();
    });

    it('should add a device', async () => {
      const data = await service.addDevice(
        authtoken,
        'test_token',
        'test',
        '70b3d5000000000b',
        'cb71e932-cd57-44a0-b5ab-aebb6b377541'
      );
      console.log(data);
      expect(data).toBeDefined();
    });

    it('should give ALREADY_EXISTS error', async () => {
      // https://grpc.github.io/grpc/core/md_doc_statuscodes.html || https://developers.google.com/maps-booking/reference/grpc-api/status_codes
      await expect(
        service.addDevice(
          authtoken,
          'test_token',
          'test_',
          '70b3d5000000000b',
          'cb71e932-cd57-44a0-b5ab-aebb6b377541'
        )
      ).rejects.toThrow('6 ALREADY_EXISTS: object already exists');
    });

    it('should remove a devices', async () => {
      const data = await service.removeDevice(
        authtoken,
        '70b3d5000000000b'
      );
      console.log(data);
      expect(data).toBeInstanceOf(Empty);
    });
  });

});
