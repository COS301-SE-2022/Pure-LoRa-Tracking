import { Module, Global } from '@nestjs/common';
import { ApiHardwareDebugController } from './-api-hardware-debug.controller';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';
import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
@Global()
@Module({
  imports : [ThingsboardThingsboardTelemetryModule],
  controllers: [ApiHardwareDebugController],
  providers: [ApiHardwareDebugService],
  exports: [ApiHardwareDebugService],
})
export class ApiHardwareDebugModule {}
