import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThingsboardThingsboardUserService } from './thingsboard-thingsboard-user.service';

@Global()
@Module({
  controllers: [],
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [ThingsboardThingsboardUserService],
  exports: [ThingsboardThingsboardUserService],
})
export class ThingsboardThingsboardUserModule {}
