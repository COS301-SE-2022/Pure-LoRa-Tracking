import { TestBed } from '@angular/core/testing';

import { DeviceNotifierService } from './device-notifier.service';

describe('DeviceNotifierService', () => {
  let service: DeviceNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
