import { Module, Global } from '@nestjs/common';
import { ChirpstackService } from './chirpstack.service';

@Global()
@Module({
  controllers: [],
  providers: [ChirpstackService],
  exports: [ChirpstackService],
})
export class ChirpstackModule {}
