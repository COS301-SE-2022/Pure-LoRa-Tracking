import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibProfileViewModule } from './client-manage-view-src-lib-profile-view.module';

describe('ClientManageViewSrcLibProfileViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibProfileViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibProfileViewModule).toBeDefined();
  });
});
