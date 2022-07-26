import { TestBed } from '@angular/core/testing';
import { TokenManagerService } from './token-manager.service';

describe('TokenManagerService', () => {
  let service: TokenManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("GetToken",()=>{
    it("Should return the token if its found",()=>{
      const val="test";
      jest.spyOn(service.cookieservice,"check").mockReturnValue(true);
      jest.spyOn(service.cookieservice,"get").mockReturnValue(val);
      expect(service.getToken()).toEqual(val);
    })

    it("Should return nothing if no token is found",()=>{
      jest.spyOn(service.cookieservice,"check").mockReturnValue(false);
      expect(service.getToken()).toEqual("");
    })
  })
});
