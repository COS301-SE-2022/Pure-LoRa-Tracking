import { DatabaseProxyModule } from '@lora/database';
import { Test } from '@nestjs/testing';
import { ProcessingApiProcessingBusService } from './processing-api-processing-bus.service';

describe('ProcessingApiProcessingBusService', () => {
  let service: ProcessingApiProcessingBusService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports :[DatabaseProxyModule],
      providers: [ProcessingApiProcessingBusService],
    }).compile();

    service = module.get(ProcessingApiProcessingBusService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
