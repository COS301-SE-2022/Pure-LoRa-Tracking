import { TestBed } from '@angular/core/testing';

import { QueueFactoryService } from './queue-factory.service';

describe('QueueFactoryService', () => {
  let service: QueueFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
