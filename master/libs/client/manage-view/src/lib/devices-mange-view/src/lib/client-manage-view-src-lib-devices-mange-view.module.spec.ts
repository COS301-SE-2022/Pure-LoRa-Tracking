import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibDevicesMangeViewModule } from './client-manage-view-src-lib-devices-mange-view.module';

describe('ClientManageViewSrcLibDevicesMangeViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibDevicesMangeViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibDevicesMangeViewModule).toBeDefined();
  });
});
