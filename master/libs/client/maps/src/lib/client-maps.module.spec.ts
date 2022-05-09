import { async, TestBed } from '@angular/core/testing';
import { ClientMapsModule } from './client-maps.module';

describe('ClientMapsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientMapsModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientMapsModule).toBeDefined();
  });
});
