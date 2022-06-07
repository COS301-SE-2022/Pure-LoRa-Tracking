import { async, TestBed } from '@angular/core/testing';
import { ClientSharedUiComponentsUiModule } from './client-shared-ui-components-ui.module';

describe('ClientSharedUiComponentsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientSharedUiComponentsUiModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientSharedUiComponentsUiModule).toBeDefined();
  });
});
