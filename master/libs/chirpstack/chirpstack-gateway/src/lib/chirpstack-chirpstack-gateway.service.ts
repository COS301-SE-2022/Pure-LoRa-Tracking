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

}
