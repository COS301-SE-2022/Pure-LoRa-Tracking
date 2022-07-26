import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibUsersViewModule } from './client-manage-view-src-lib-users-view.module';

describe('ClientManageViewSrcLibUsersViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibUsersViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibUsersViewModule).toBeDefined();
  });
});
