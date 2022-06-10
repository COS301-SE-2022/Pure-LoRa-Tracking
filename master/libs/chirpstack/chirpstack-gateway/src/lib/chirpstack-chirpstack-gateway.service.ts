import { Injectable } from '@nestjs/common';

import * as grpc from '@grpc/grpc-js';

import { GatewayServiceClient } from '@chirpstack/chirpstack-api/as/external/api/gateway_grpc_pb';
import * as gatewayMessages from '@chirpstack/chirpstack-api/as/external/api/gateway_pb';
import { Location } from '@chirpstack/chirpstack-api/common/common_pb';

@Injectable()
export class ChirpstackChirpstackGatewayService {
  gatewayServiceClient: GatewayServiceClient;
  metadata: grpc.Metadata;

  constructor() {
    this.gatewayServiceClient = new GatewayServiceClient(
      'localhost:8080',
      grpc.credentials.createInsecure()
    );

    this.metadata = new grpc.Metadata();
  }

  async listGateways(
    authtoken: string
  ): Promise<gatewayMessages.ListGatewayResponse> {
    this.metadata.set('authorization', 'Bearer ' + authtoken);

    const listGatewayRequest = new gatewayMessages.ListGatewayRequest();
    listGatewayRequest.setLimit(1000);
    listGatewayRequest.setOrganizationId(1);

    return new Promise((res, rej) => {
      this.gatewayServiceClient.list(
        listGatewayRequest,
        this.metadata,
        (error, data) => {
          if (data) res(data);
          else rej(error);
        }
      );
    });
  }

  async addGateway(
    authtoken: string,
    thingsBoardDeviceToken: string,
    gatewayName: string,
    gatewayId: string,
    gatewayDesc = 'General gateway',
    networkServer = 1,
    organisationId = 1
  ) {
    this.metadata.set('authorization', 'Bearer ' + authtoken);
    const createGatewayRequest = new gatewayMessages.CreateGatewayRequest();
    const gateway = new gatewayMessages.Gateway();
    const location = new Location();
    // location.setLatitude(0);
    // location.setLongitude(0);
    // location.setAccuracy(0)
    // location.setAltitude(0)
    // location.setSource(0)

    gateway.setId(gatewayId);
    gateway.setName(gatewayName);
    gateway.setDescription(gatewayDesc);
    gateway.setLocation(location);
    gateway.setOrganizationId(organisationId);
    gateway.setNetworkServerId(networkServer);

    const gatewayTags = gateway.getTagsMap();
    gatewayTags.set('thingsBoardDeviceToken', thingsBoardDeviceToken);

    createGatewayRequest.setGateway(gateway);

    return new Promise((res, rej) => {
      this.gatewayServiceClient.create(
        createGatewayRequest,
        this.metadata,
        (error, data) => {
          if (data) res(data);
          else rej(error);
        }
      );
    });
  }

  async removeGateway(authtoken: string, gatewayId: string) {
    this.metadata.set('authorization', 'Bearer ' + authtoken);

    const deleteGatewayRequest = new gatewayMessages.DeleteGatewayRequest();
    deleteGatewayRequest.setId(gatewayId);

    return new Promise((res, rej) => {
      this.gatewayServiceClient.delete(
        deleteGatewayRequest,
        this.metadata,
        (error, data) => {
          if (data) res(data);
          else rej(error);
        }
      );
    });
  }
}
