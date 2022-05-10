import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardTelemetryService],
  exports: [ThingsboardThingsboardTelemetryService],
})
export class ThingsboardThingsboardTelemetryModule {}
