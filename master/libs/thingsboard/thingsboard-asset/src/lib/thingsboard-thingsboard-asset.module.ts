import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardAssetService } from './thingsboard-thingsboard-asset.service';

@Global()
@Module({
  controllers: [],
  imports : [HttpModule],
  providers: [ThingsboardThingsboardAssetService],
  exports: [ThingsboardThingsboardAssetService],
})
export class ThingsboardThingsboardAssetModule {}
