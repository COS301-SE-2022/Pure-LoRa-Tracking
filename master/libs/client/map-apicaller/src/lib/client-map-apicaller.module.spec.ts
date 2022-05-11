import { async, TestBed } from '@angular/core/testing';
import { ClientMapApicallerModule } from './client-map-apicaller.module';

describe('ClientMapApicallerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientMapApicallerModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientMapApicallerModule).toBeDefined();
  });
});
