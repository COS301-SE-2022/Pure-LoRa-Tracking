import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardAssetService } from './thingsboard-thingsboard-asset.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardAssetService],
  exports: [ThingsboardThingsboardAssetService],
})
export class ThingsboardThingsboardAssetModule {}
