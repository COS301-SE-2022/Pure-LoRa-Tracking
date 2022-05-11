import { Module, Global } from '@nestjs/common';
import { ApiHardwareDebugController } from './-api-hardware-debug.controller';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';

@Global()
@Module({
  controllers: [ApiHardwareDebugController],
  providers: [ApiHardwareDebugService],
  exports: [ApiHardwareDebugService],
})
export class ApiHardwareDebugModule {}