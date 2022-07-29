import { async, TestBed } from '@angular/core/testing';
import { ClientDeviceAddViewModule } from './client-device-add-view.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
describe('ClientDeviceAddViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientDeviceAddViewModule,MatSnackBarModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientDeviceAddViewModule).toBeDefined();
  });
});
