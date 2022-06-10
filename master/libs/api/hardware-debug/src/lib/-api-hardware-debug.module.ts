import { Module, Global } from '@nestjs/common';
import { ApiHardwareDebugController } from './-api-hardware-debug.controller';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import { LocationModule } from '@lora/location';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
@Global()
@Module({
  imports : [ThingsboardThingsboardClientModule, LocationModule],
  controllers: [ApiHardwareDebugController],
  providers: [ApiHardwareDebugService],
  exports: [ApiHardwareDebugService],
})
export class ApiHardwareDebugModule {}
