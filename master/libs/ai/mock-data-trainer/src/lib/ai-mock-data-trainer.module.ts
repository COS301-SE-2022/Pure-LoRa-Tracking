import { Module, Global } from '@nestjs/common';
import { AiMockDataTrainerService } from './ai-mock-data-trainer.service';

@Global()
@Module({
  controllers: [],
  providers: [AiMockDataTrainerService],
  exports: [AiMockDataTrainerService],
})
export class AiMockDataTrainerModule {}
