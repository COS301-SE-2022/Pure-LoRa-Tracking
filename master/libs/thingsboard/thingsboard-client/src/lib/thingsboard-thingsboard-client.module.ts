import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardClientService],
  exports: [ThingsboardThingsboardClientService],
})
export class ThingsboardThingsboardClientModule {}
