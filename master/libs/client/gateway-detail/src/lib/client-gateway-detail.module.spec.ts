import { async, TestBed } from '@angular/core/testing';
import { ClientGatewayDetailModule } from './client-gateway-detail.module';

describe('ClientGatewayDetailModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientGatewayDetailModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientGatewayDetailModule).toBeDefined();
  });
});
