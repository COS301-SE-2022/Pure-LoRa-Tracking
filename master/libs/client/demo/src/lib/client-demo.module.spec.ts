import { async, TestBed } from '@angular/core/testing';
import { ClientDemoModule } from './client-demo.module';

describe('ClientMapsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientDemoModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientDemoModule).toBeDefined();
  });
});
