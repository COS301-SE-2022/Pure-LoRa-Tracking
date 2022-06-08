import { async, TestBed } from '@angular/core/testing';
import { ClientSharedUiMaterialUiModule } from './client-shared-ui-material-ui.module';

describe('ClientSharedUiMaterialUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientSharedUiMaterialUiModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientSharedUiMaterialUiModule).toBeDefined();
  });
});
