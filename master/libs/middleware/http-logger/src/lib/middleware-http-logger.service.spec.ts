import { Test } from '@nestjs/testing';
import { MiddlewareHttpLoggerService } from './middleware-http-logger.service';

describe('MiddlewareHttpLoggerService', () => {
  let service: MiddlewareHttpLoggerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MiddlewareHttpLoggerService],
    }).compile();

    service = module.get(MiddlewareHttpLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
