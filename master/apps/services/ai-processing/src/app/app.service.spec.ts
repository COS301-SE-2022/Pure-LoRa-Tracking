import { Test } from '@nestjs/testing';
import { ProcessingApiProcessingBusModule } from '@processing/bus';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports :[ProcessingApiProcessingBusModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });
});
