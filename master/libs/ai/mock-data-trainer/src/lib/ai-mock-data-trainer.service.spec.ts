import tf = require('@tensorflow/tfjs-node');
import { Test } from '@nestjs/testing';
import { AiMockDataTrainerService } from './ai-mock-data-trainer.service';

describe('AiMockDataTrainerService', () => {
  let service: AiMockDataTrainerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AiMockDataTrainerService],
    }).compile();

    service = module.get(AiMockDataTrainerService);
    tf.setBackend('cpu');
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should call trainModel and display results', async () => {
    await service.trainModel();
  });
});
