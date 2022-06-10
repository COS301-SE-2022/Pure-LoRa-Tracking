import { Module, Global } from '@nestjs/common';
import { ChirpstackChirpstackSensorService } from './chirpstack-chirpstack-sensor.service';

@Global()
@Module({
  controllers: [],
  providers: [ChirpstackChirpstackSensorService],
  exports: [ChirpstackChirpstackSensorService],
})
export class ChirpstackChirpstackSensorModule {}
