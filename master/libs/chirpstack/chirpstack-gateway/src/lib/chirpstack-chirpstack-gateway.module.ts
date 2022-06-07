import { Module, Global } from '@nestjs/common';
import { ChirpstackChirpstackGatewayService } from './chirpstack-chirpstack-gateway.service';

@Global()
@Module({
  controllers: [],
  providers: [ChirpstackChirpstackGatewayService],
  exports: [ChirpstackChirpstackGatewayService],
})
export class ChirpstackChirpstackGatewayModule {}
