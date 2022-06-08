import { Module, Global } from '@nestjs/common';
import { ApiHardwareDebugController } from './-api-hardware-debug.controller';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import { LocationModule } from '@lora/location';
import { ThingsboardThingsboardUserModule } from '@lora/thingsboard-user';
@Global()
@Module({
  imports : [ThingsboardThingsboardUserModule, LocationModule],
  controllers: [ApiHardwareDebugController],
  providers: [ApiHardwareDebugService],
  exports: [ApiHardwareDebugService],
})
export class ApiHardwareDebugModule {}
