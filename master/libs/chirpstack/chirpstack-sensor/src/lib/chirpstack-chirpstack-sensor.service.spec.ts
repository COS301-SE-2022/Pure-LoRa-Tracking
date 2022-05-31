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
    it('it should list devices', async () => {
      const data = await service.list_devices(authtoken);
      console.log(data);
      expect(data).toBeInstanceOf(deviceMessages.ListDeviceResponse);
    });
      
  });
  describe('get_profiles', () => {
    it('it should get device profiles', async () => {
      const data = await service.get_profiles(authtoken);
      console.log(data);

      expect(data).toBeDefined();
      
    });
  });
  
});
