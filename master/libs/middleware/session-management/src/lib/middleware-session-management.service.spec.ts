import { Test } from '@nestjs/testing';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';
import { ThingsboardThingsboardClientModule } from "@lora/thingsboard-client";
import { IncomingMessage, Server, ServerResponse } from 'http';

describe('MiddlewareSessionManagementService', () => {
  let service: MiddlewareSessionManagementService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MiddlewareSessionManagementService],
      imports: [ThingsboardThingsboardClientModule]
    }).compile();

    service = module.get(MiddlewareSessionManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe("Use should return", () => {
    it("Should call next if url starts with /login", () => {
      const mockrequest = {
        url: "/login/any"
      } as Request
      const test: any = jest.createMockFromModule("http");
      jest.spyOn(test, "ServerResponse").mock;
      const next = jest.fn()
      service.use(mockrequest, test.ServerResponse, next)
      expect(next).toBeCalled()
    });



  })

});
