import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibManageContentModule } from './client-manage-view-src-lib-manage-content.module';

describe('ClientManageViewSrcLibManageContentModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibManageContentModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibManageContentModule).toBeDefined();
  });
});
