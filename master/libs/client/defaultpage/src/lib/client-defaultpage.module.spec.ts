import { async, TestBed } from '@angular/core/testing';
import { ClientDefaultpageModule } from './client-defaultpage.module';

describe('ClientDefaultpageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientDefaultpageModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientDefaultpageModule).toBeDefined();
  });
});
