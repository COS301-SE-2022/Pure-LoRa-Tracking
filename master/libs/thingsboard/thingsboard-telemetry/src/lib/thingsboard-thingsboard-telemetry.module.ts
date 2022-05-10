import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardTelemetryService } from './thingsboard-thingsboard-telemetry.service';

@Global()
@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [ThingsboardThingsboardTelemetryService],
  exports: [ThingsboardThingsboardTelemetryService],
})
export class ThingsboardThingsboardTelemetryModule {}
