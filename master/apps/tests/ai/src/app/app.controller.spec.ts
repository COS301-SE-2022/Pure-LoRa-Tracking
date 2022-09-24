import { LocationModule } from '@lora/location';
import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingApiProcessingBusModule } from '@processing/bus';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports:[LocationModule, ProcessingApiProcessingBusModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  it('should be defined', ()=> {
    expect(app).toBeTruthy
  })
});