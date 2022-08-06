import { Test } from '@nestjs/testing';
import { ProcessingBus } from './processing-api-bus.service';

describe('ProcessingApiBusService', () => {
  let service: ProcessingBus;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProcessingBus],
    }).compile();

    service = module.get(ProcessingBus);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
