import { Module, Global } from '@nestjs/common';
import { ServerThingsboardUserService } from './server-thingsboard-user.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [ServerThingsboardUserService],
  exports: [ServerThingsboardUserService],
})
export class ServerThingsboardUserModule {}
