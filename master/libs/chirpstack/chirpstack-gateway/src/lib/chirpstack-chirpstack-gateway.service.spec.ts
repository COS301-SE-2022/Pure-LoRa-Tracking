import { Test } from '@nestjs/testing';
import { ChirpstackChirpstackGatewayService } from './chirpstack-chirpstack-gateway.service';
import * as gatewayMessages from '@chirpstack/chirpstack-api/as/external/api/gateway_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Location } from '@chirpstack/chirpstack-api/common/common_pb';

const describeLive = process.env.PURELORABUILD == 'DEV' ? describe : describe.skip;

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
  
  // Mock tests
  describe('manage gateways', () => {
    it('should add a gateway', async () => {
      // Inputs
      const gatewayName = 'gateway_1';
      const gatewayId = '353036203a001011';
      // Output
      const response = new Empty();
      
      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.gatewayServiceClient, 'create')
        .mockImplementationOnce((createGatewayRequest, metadata, callback: any) => {
          expect(createGatewayRequest.getGateway()).toBeInstanceOf(gatewayMessages.Gateway);
          expect(createGatewayRequest.getGateway().getId()).toBe(gatewayId);
          expect(createGatewayRequest.getGateway().getName()).toBe(gatewayName);
          callback(null, response);
          return null;
        });

      await service.addGateway(
        authtoken,
        'test',
        gatewayName,
        gatewayId
      );

      expect(service.gatewayServiceClient.create).toHaveBeenCalled();
      // expect(data).toBe(response);
    });

    it('should update gateway location', async () => {
      // Inputs
      const gatewayId = '353036203a001011';
      // Output
      const response = new gatewayMessages.GetGatewayResponse;
      const gateWay = new gatewayMessages.Gateway;
      
      gateWay.setLocation(new Location);
      response.setGateway(gateWay);

      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.gatewayServiceClient, 'get')
        .mockImplementationOnce(
          (getGatewayRequest, metadata, callback: any) => {
            expect(getGatewayRequest.getId()).toBe(gatewayId);
            expect(metadata).toBe(service.metadata);
            
            callback(null, response);
            return null;
          }
        );

      jest
        .spyOn(service.gatewayServiceClient, 'update')
        .mockImplementationOnce(
          (updateGatewayRequest, metadata, callback: any) => {
            expect(metadata).toBe(service.metadata);
            callback(null, response);
            return null;
          }
        );

      service.setGatewayLocation(authtoken, gatewayId, 0, 0);
      expect(service.gatewayServiceClient.get).toBeCalled();
      expect(service.gatewayServiceClient.update).toBeCalled();
    });

  

    it('should list gateways', async () => {
      // Inputs
      // Output
      const response = new gatewayMessages.ListGatewayResponse();

      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.gatewayServiceClient, 'list')
        .mockImplementationOnce(
          (listGatewayRequest, metadata, callback: any) => {
            callback(null, response);
            return null;
          }
        );

      const data = await service.listGateways(authtoken);
      expect(data).toBeInstanceOf(gatewayMessages.ListGatewayResponse);

      jest
        .spyOn(service.gatewayServiceClient, 'list')
        .mockImplementationOnce(
          (listGatewayRequest, metadata, callback: any) => {
            callback("TEST_ERROR", null);
            return null;
          }
        );
      
      await expect(service.listGateways(authtoken)).rejects.toEqual("TEST_ERROR");
      
    });

    it('should delete a gateway', async () => {
      // Inputs
      const gatewayId = '353036203a001011';
      // Output
      const response = new Empty();

      // callback needs to be defined as any since it is an overloaded function
      jest
        .spyOn(service.gatewayServiceClient, 'delete')
        .mockImplementationOnce(
          (deleteGatewayRequest, metadata, callback: any) => {
            expect(deleteGatewayRequest.getId()).toBe(gatewayId);
            expect(metadata).toBe(service.metadata);
            callback(null, response);
            return null;
          }
        );

      const data = await service.removeGateway(authtoken, gatewayId);
      expect(service.gatewayServiceClient.delete).toBeCalled();
      // expect(data).toBe(response);
    });

  })

  // Live tests
  describeLive('manage gateways live', () => {
    it('should list gateways', async () => {
      const data = await service.listGateways(authtoken);
      console.log(data);
      expect(data).toBeInstanceOf(gatewayMessages.ListGatewayResponse);
      // expect(data.getTotalCount()).toBe(2);
    });

    it('should add a gateway', async () => {
      const gatewayCount = (
        await service.listGateways(authtoken)
      ).getTotalCount();

      const data = await service.addGateway(
        authtoken,
        'test',
        'gateway_1',
        '353036203a001011'
      );

      expect(data).toBeInstanceOf(Empty);
      const newGatewayCount = (
        await service.listGateways(authtoken)
      ).getTotalCount();
      expect(newGatewayCount).toBeGreaterThan(gatewayCount);
    });

    it('should delete a gateway', async () => {
      const gatewayCount = (
        await service.listGateways(authtoken)
      ).getTotalCount();

      const data = await service.removeGateway(
        authtoken,
        '353036203a001011'
      );
      // console.log(data);
      expect(data).toBeInstanceOf(Empty);
      const newGatewayCount = (
        await service.listGateways(authtoken)
      ).getTotalCount();
      expect(newGatewayCount).toBeLessThan(gatewayCount);
    });
  });

});
