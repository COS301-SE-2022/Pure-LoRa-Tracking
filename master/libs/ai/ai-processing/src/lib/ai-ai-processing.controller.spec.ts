import { Test } from '@nestjs/testing';
import { AiAiProcessingController } from './ai-ai-processing.controller';
import { AiAiProcessingService } from './ai-ai-processing.service';

describe('AiAiProcessingController', () => {
  let controller: AiAiProcessingController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiAiProcessingService],
      controllers: [AiAiProcessingController],
    }).compile();

    controller = module.get(AiAiProcessingController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
