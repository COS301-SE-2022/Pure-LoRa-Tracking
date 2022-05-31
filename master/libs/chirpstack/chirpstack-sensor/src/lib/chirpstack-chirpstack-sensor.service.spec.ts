import { Test } from '@nestjs/testing';
import { ChirpstackChirpstackSensorService } from './chirpstack-chirpstack-sensor.service';
import * as deviceMessages from '@chirpstack/chirpstack-api/as/external/api/device_pb';
import { ListDeviceProfileResponse } from '@chirpstack/chirpstack-api/as/external/api/deviceProfile_pb';

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

  describe('list_devices', () =>{
    it('it should list devices', async() => {
      const data = await service.list_devices(authtoken);
      console.log(data);
      expect(data).toBeInstanceOf(deviceMessages.ListDeviceResponse);
    });
      
  });
  describe('get_profiles', () => {
    it('it should get device profiles', async() => {
      const data = await service.get_profiles(authtoken);
      console.log(data);

      expect(data).toBeDefined();
      
    });
  });

    describe('add_device', () => {
      //tests will only work if thingsboard is already configured

      // it('it should add a device', async() => {
      //   const data = await service.add_device(
      //     authtoken,
      //     'test',
      //     '70b3d5000000000b',
      //     'cb71e932-cd57-44a0-b5ab-aebb6b377541'
      //   );
      //   console.log(data);

      //   expect(data).toBeDefined();
      // });

      // it('it should give ALREADY_EXISTS error', async() => {
      //   // https://grpc.github.io/grpc/core/md_doc_statuscodes.html || https://developers.google.com/maps-booking/reference/grpc-api/status_codes
      //   await expect(
      //     service.add_device(
      //       authtoken,
      //       'test_',
      //       '70b3d5000000000b',
      //       'cb71e932-cd57-44a0-b5ab-aebb6b377541'
      //     )
      //   ).rejects.toThrow('6 ALREADY_EXISTS: object already exists');
      // });
    });

});
