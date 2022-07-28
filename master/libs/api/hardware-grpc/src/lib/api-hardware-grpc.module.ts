import { Module, Global } from '@nestjs/common';
import { ApiHardwareGrpcController } from './api-hardware-grpc.controller';
import { ApiHardwareGrpcService } from './api-hardware-grpc.service';
import { LocationModule } from '@lora/location';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
@Global()
@Module({
  imports: [ThingsboardThingsboardClientModule, LocationModule],
  controllers: [ApiHardwareGrpcController],
  providers: [ApiHardwareGrpcService],
  exports: [ApiHardwareGrpcService],
})
export class ApiHardwareGrpcModule {}
