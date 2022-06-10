import { async, TestBed } from '@angular/core/testing';
import { ClientLeafletLibraryModule } from './client-leaflet-library.module';

describe('ClientLeafletLibraryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientLeafletLibraryModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientLeafletLibraryModule).toBeDefined();
  });
});
