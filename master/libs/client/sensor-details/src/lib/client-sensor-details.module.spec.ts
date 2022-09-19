import { async, TestBed } from '@angular/core/testing';
import { ClientSensorDetailsModule } from './client-sensor-details.module';

describe('ClientSensorDetailsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientSensorDetailsModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientSensorDetailsModule).toBeDefined();
  });
});
