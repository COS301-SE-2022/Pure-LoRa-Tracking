import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardDeviceService } from './thingsboard-thingsboard-device.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardDeviceService],
  exports: [ThingsboardThingsboardDeviceService],
})
export class ThingsboardThingsboardDeviceModule {}
