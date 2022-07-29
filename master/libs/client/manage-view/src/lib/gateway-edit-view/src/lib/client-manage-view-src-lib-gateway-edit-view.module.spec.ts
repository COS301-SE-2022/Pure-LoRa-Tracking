import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewSrcLibGatewayEditViewModule } from './client-manage-view-src-lib-gateway-edit-view.module';

describe('ClientManageViewSrcLibGatewayEditViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewSrcLibGatewayEditViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewSrcLibGatewayEditViewModule).toBeDefined();
  });
});
