import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardDeviceService } from './thingsboard-thingsboard-device.service';

@Global()
@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [ThingsboardThingsboardDeviceService],
  exports: [ThingsboardThingsboardDeviceService],
})
export class ThingsboardThingsboardDeviceModule {}
