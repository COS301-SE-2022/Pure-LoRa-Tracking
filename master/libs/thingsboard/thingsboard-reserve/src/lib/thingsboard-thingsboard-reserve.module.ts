import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardReserveService } from './thingsboard-thingsboard-reserve.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardReserveService],
  exports: [ThingsboardThingsboardReserveService],
})
export class ThingsboardThingsboardReserveModule {}
