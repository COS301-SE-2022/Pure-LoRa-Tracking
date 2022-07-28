import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibProfileEditModule } from './client-manage-view-src-lib-profile-edit.module';

describe('ClientManageViewSrcLibProfileEditModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibProfileEditModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibProfileEditModule).toBeDefined();
  });
});
