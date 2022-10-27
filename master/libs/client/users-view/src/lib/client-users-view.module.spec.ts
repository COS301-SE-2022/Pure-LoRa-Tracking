import { async, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientUsersViewModule } from './client-users-view.module';

describe('ClientUsersViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientUsersViewModule,MatSnackBarModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientUsersViewModule).toBeDefined();
  });
});
