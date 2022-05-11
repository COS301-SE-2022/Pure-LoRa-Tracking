import { Test } from '@nestjs/testing';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';

describe('ApiHardwareDebugService', () => {
  let service: ApiHardwareDebugService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiHardwareDebugService],
    }).compile();

    service = module.get(ApiHardwareDebugService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
