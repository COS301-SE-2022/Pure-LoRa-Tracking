import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardReserveService } from './thingsboard-thingsboard-reserve.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardReserveService],
  exports: [ThingsboardThingsboardReserveService],
  imports : [HttpModule]
})
export class ThingsboardThingsboardReserveModule {}
