import { async, TestBed } from '@angular/core/testing';
import { ClientReserveViewModule } from './client-reserve-view.module';

describe('ClientReserveViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientReserveViewModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientReserveViewModule).toBeDefined();
  });
});
