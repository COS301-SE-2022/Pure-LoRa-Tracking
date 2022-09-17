import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibReserveEditModule } from './client-manage-view-src-lib-reserve-edit.module';

describe('ClientManageViewSrcLibReserveEditModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibReserveEditModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibReserveEditModule).toBeDefined();
  });
});
