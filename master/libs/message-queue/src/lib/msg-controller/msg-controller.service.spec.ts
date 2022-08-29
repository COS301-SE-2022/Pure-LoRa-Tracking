import { TestBed } from '@angular/core/testing';

import { MsgControllerService } from './msg-controller.service';

describe('MsgControllerService', () => {
  let service: MsgControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
