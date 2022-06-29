import { Test } from '@nestjs/testing';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';

describe('MiddlewareSessionManagementService', () => {
  let service: MiddlewareSessionManagementService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MiddlewareSessionManagementService],
    }).compile();

    service = module.get(MiddlewareSessionManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
