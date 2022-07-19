import { async, TestBed } from '@angular/core/testing';
import { ClientManageViewModule } from './client-manage-view.module';

describe('ClientManageViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientManageViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientManageViewModule).toBeDefined();
  });
});
