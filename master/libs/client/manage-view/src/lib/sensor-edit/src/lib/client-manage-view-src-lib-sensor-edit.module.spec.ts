import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibSensorEditModule } from './client-manage-view-src-lib-sensor-edit.module';

describe('ClientManageViewSrcLibSensorEditModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibSensorEditModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibSensorEditModule).toBeDefined();
  });
});
