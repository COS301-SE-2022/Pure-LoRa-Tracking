import { Test } from '@nestjs/testing';
import { ApiHardwareDebugController } from './-api-hardware-debug.controller';
import { ApiHardwareDebugService } from './-api-hardware-debug.service';

describe('ApiHardwareDebugController', () => {
  let controller: ApiHardwareDebugController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiHardwareDebugService],
      controllers: [ApiHardwareDebugController],
    }).compile();

    controller = module.get(ApiHardwareDebugController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
