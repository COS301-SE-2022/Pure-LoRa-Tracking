import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibUsersEditModule } from './client-manage-view-src-lib-users-edit.module';



describe('ClientManageViewSrcLibUsersEditModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibUsersEditModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibUsersEditModule).toBeDefined();
  });
});
