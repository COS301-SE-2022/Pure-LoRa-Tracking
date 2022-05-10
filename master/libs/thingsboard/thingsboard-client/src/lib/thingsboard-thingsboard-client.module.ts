import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';
import {  } from '' 

@Global()
@Module({
  controllers: [],
  imports : [],
  providers: [ThingsboardThingsboardClientService],
  exports: [ThingsboardThingsboardClientService],
})
export class ThingsboardThingsboardClientModule {}
