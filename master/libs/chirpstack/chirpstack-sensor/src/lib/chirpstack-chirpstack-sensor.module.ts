import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ChirpstackChirpstackSensorService } from './chirpstack-chirpstack-sensor.service';

@Global()
@Module({
  imports : [HttpModule],
  controllers: [],
  providers: [ChirpstackChirpstackSensorService],
  exports: [ChirpstackChirpstackSensorService],
})
export class ChirpstackChirpstackSensorModule {}
