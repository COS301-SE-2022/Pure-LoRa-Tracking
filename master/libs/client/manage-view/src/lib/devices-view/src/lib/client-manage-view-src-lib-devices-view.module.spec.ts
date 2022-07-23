import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibDevicesViewModule } from './client-manage-view-src-lib-devices-view.module';

describe('ClientManageViewSrcLibDevicesViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibDevicesViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibDevicesViewModule).toBeDefined();
  });
});
