import { Test } from '@nestjs/testing';
import { ChirpstackChirpstackGatewayService } from './chirpstack-chirpstack-gateway.service';
import * as gatewayMessages from '@chirpstack/chirpstack-api/as/external/api/gateway_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

describe('ChirpstackChirpstackGatewayService', () => {
  let service: ChirpstackChirpstackGatewayService;
  let authtoken: string;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChirpstackChirpstackGatewayService],
    }).compile();

    service = module.get(ChirpstackChirpstackGatewayService);
    authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiMWIwMmZhNDAtMzI4OS00NzllLWI2NjUtM2MwMzg4YmEzZDRmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1Mzg1MDYwNywic3ViIjoiYXBpX2tleSJ9.epxodFKkLwrvinNBVgo0r9k4PWLxumzAGw61oKrTMrI';
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('manage gateways', () => {

    it('it should list gateways', async () => {
      const data = await service.listGateways(authtoken);
      console.log(data);
      expect(data).toBeInstanceOf(gatewayMessages.ListGatewayResponse);
    });
  });

});
