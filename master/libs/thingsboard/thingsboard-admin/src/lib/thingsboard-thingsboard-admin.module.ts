import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardAdminService } from './thingsboard-thingsboard-admin.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardAdminService],
  exports: [ThingsboardThingsboardAdminService],
})
export class ThingsboardThingsboardAdminModule {}
