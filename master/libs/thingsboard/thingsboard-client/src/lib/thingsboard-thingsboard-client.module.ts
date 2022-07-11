import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardClientService } from './thingsboard-thingsboard-client.service';
import { ThingsboardThingsboardUserModule } from '@lora/thingsboard-user'
import { ThingsboardThingsboardDeviceModule } from '@lora/thingsboard-device';
import { ThingsboardThingsboardTelemetryModule } from '@lora/thingsboard-telemetry';
import { ThingsboardThingsboardAssetModule } from '@lora/thingsboard-asset';
import { ThingsboardThingsboardAdminModule } from '@lora/thingsboard/admin';

@Global()
@Module({
  controllers: [],
  imports : [ThingsboardThingsboardUserModule, ThingsboardThingsboardDeviceModule, ThingsboardThingsboardTelemetryModule, 
                    ThingsboardThingsboardAssetModule, ThingsboardThingsboardAdminModule],
  providers: [ThingsboardThingsboardClientService],
  exports: [ThingsboardThingsboardClientService],
})
export class ThingsboardThingsboardClientModule {}
