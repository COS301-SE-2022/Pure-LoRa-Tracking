import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';

@Module({
  imports: [ThingsboardThingsboardClientModule],
  controllers: [],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
