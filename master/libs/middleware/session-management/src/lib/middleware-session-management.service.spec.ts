import { Test } from '@nestjs/testing';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';
import { ThingsboardThingsboardClientModule } from "@lora/thingsboard-client";
import { IncomingMessage, Server, ServerResponse } from 'http';
import { Header } from '@nestjs/common';
describe('MiddlewareSessionManagementService', () => {
  let service: MiddlewareSessionManagementService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MiddlewareSessionManagementService],
      imports:[ThingsboardThingsboardClientModule]
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

  describe("Cookie Requests",()=>{

    it("No Cookie provided -> Fail",()=>{
      const mockrequest = {
        headers:{},
        url: "/any/any",
      } as Request
      const test: any = jest.createMockFromModule("http");
      jest.spyOn(test, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,test.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(test.ServerResponse,"Token cookie or refresh token cookie not provided",400);

    })
    
    it("No headers -> Fail",()=>{
      const mockrequest = {
        url: "/any/any",
      } as Request
      const test: any = jest.createMockFromModule("http");
      jest.spyOn(test, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,test.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(test.ServerResponse,"No headers provided",400);
    })


    it("No Pure Lora token -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"test"
        },
        url: "/any/any",
      } as unknown as Request
      const test: any = jest.createMockFromModule("http");
      jest.spyOn(test, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,test.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(test.ServerResponse,"Token cookie not found",400);
    })


    it("No Pure Lora refresh token -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN=any;"
        },
        url: "/any/any",
      } as unknown as Request
      const test: any = jest.createMockFromModule("http");
      jest.spyOn(test, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,test.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(test.ServerResponse,"Refresh Token cookie not found",400);
    })

    it("Pure Lora token null -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN;PURELORA_REFRESHTOKEN=any"
        },
        url: "/any/any",
      } as unknown as Request
      const test: any = jest.createMockFromModule("http");
      jest.spyOn(test, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,test.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(test.ServerResponse,"Token cookie not found",400);
    })

    it("Pure Lora refresh token null -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN=any;PURELORA_REFRESHTOKEN"
        },
        url: "/any/any",
      } as unknown as Request
      const test: any = jest.createMockFromModule("http");
      jest.spyOn(test, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,test.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(test.ServerResponse,"Refresh Token cookie not found",400);
    })
    
  })


});
