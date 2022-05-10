import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardUserService } from './thingsboard-thingsboard-user.service';

@Global()
@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [ThingsboardThingsboardUserService],
  exports: [ThingsboardThingsboardUserService],
})
export class ThingsboardThingsboardUserModule {}
