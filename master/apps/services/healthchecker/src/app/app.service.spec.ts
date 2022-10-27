import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import {TerminusModule} from "@nestjs/terminus"

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports:[TerminusModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to healthchecker!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to healthchecker!',
      });
    });
  });
});
