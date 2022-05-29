import { Test } from '@nestjs/testing';
import { ChirpstackChirpstackSensorService } from './chirpstack-chirpstack-sensor.service';
// import {Metadata} from '@grpc/grpc-js/src/metadata';
// import {Metadata} from '@grpc/grpc-js';
// import { DeviceServiceClient } from '@chirpstack/chirpstack-api/as/external/api/device_grpc_pb';


describe('ChirpstackChirpstackSensorService', () => {
  let service: ChirpstackChirpstackSensorService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChirpstackChirpstackSensorService],
      imports: [],
    }).compile();

    await module.init()
    service = module.get(ChirpstackChirpstackSensorService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  test('it should run', done => {
    const getAttributeMock = jest.fn((error, data) => {
      console.log(data);
      done();
    });
    const authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';
    service.list_devices(getAttributeMock, authtoken);
    // expect(getAttributeMock).toHaveBeenCalled();
  });
  
});
