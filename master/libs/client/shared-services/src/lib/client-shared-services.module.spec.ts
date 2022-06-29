import { async, TestBed } from '@angular/core/testing';
import { ClientSharedServicesModule } from './client-shared-services.module';

describe('ClientSharedServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientSharedServicesModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientSharedServicesModule).toBeDefined();
  });
});
