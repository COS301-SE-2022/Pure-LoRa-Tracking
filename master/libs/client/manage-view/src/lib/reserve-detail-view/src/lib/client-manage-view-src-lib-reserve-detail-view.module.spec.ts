import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibReserveDetailViewModule } from './client-manage-view-src-lib-reserve-detail-view.module';

describe('ClientManageViewSrcLibReserveDetailViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibReserveDetailViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibReserveDetailViewModule).toBeDefined();
  });
});
