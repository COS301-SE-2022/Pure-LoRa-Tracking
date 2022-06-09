import { TestBed } from '@angular/core/testing';

import { SensoritemOverlayViewService } from './sensoritem-overlay-view.service';

describe('SensoritemOverlayViewService', () => {
  let service: SensoritemOverlayViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensoritemOverlayViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
