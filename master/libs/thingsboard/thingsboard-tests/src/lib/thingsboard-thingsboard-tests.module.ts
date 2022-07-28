import { Module, Global } from '@nestjs/common';
import { ThingsboardThingsboardTestsService } from './thingsboard-thingsboard-tests.service';

@Global()
@Module({
  controllers: [],
  providers: [ThingsboardThingsboardTestsService],
  exports: [ThingsboardThingsboardTestsService],
})
export class ThingsboardThingsboardTestsModule {}
