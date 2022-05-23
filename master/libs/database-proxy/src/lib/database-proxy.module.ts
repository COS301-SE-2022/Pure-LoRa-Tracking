import { Module, Global } from '@nestjs/common';
import { DatabaseProxyService } from './database-proxy.service';

@Global()
@Module({
  controllers: [],
  providers: [DatabaseProxyService],
  exports: [DatabaseProxyService],
})
export class DatabaseProxyModule {}
