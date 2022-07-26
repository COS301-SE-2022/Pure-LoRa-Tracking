import { Module, Global } from '@nestjs/common';
import { ApiApiTestingService } from './api-api-testing.service';

@Global()
@Module({
  controllers: [],
  providers: [ApiApiTestingService],
  exports: [ApiApiTestingService],
})
export class ApiApiTestingModule {}
