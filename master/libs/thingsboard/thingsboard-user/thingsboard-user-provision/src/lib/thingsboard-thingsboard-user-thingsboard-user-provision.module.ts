import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardUserThingsboardUserProvisionService } from './thingsboard-thingsboard-user-thingsboard-user-provision.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardUserThingsboardUserProvisionService],
  exports: [ThingsboardThingsboardUserThingsboardUserProvisionService],
})
export class ThingsboardThingsboardUserThingsboardUserProvisionModule {}
