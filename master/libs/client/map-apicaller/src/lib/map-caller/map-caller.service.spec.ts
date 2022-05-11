import { TestBed } from '@angular/core/testing';

import { MapCallerService } from './map-caller.service';

describe('MapCallerService', () => {
  let service: MapCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
