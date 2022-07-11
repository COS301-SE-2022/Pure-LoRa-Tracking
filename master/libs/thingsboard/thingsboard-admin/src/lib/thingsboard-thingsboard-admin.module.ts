import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardAdminService } from './thingsboard-thingsboard-admin.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardAdminService],
  exports: [ThingsboardThingsboardAdminService],
  imports : [HttpModule]
})
export class ThingsboardThingsboardAdminModule {}
