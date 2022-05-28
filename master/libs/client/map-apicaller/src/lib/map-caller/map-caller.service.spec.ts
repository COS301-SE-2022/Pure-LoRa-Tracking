import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapCallerService } from './map-caller.service';

describe('MapCallerService', () => {
  let service: MapCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(MapCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
