import { Test } from '@nestjs/testing';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';
import { ThingsboardThingsboardClientModule } from "@lora/thingsboard-client";
import { IncomingMessage, Server, ServerResponse } from 'http';
import { Header } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
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
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      service.use(mockrequest, httpmock.ServerResponse, next)
      expect(next).toBeCalled()
    });

  })

  describe("Cookie Requests",()=>{

    it("No Cookie provided -> Fail",()=>{
      const mockrequest = {
        headers:{},
        url: "/any/any",
      } as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Token cookie or refresh token cookie not provided",400);

    })
    
    it("No headers -> Fail",()=>{
      const mockrequest = {
        url: "/any/any",
      } as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"No headers provided",400);
    })


    it("No Pure Lora token -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"test"
        },
        url: "/any/any",
      } as unknown as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Token cookie not found",400);
    })


    it("No Pure Lora refresh token -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN=any;"
        },
        url: "/any/any",
      } as unknown as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Refresh Token cookie not found",400);
    })

    it("Pure Lora token null -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN;PURELORA_REFRESHTOKEN=any"
        },
        url: "/any/any",
      } as unknown as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Token cookie not found",400);
    })

    it("Pure Lora refresh token null -> Fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN=any;PURELORA_REFRESHTOKEN"
        },
        url: "/any/any",
      } as unknown as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Refresh Token cookie not found",400);
    })
    
  })

  describe("JWT tests", () => {
    
    it("Verify should be called with the right cookie",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=any"
        },
        url: "/any/any",
      } as unknown as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const next = jest.fn()
      jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,callback:Function)=>{
        expect(token).toEqual("MYTOKEN");
      });
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(jwt.verify).toBeCalled();
    })

    it("If malformed -> fail",()=>{
      const mockrequest = {
        headers:{
          "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=any"
        },
        url: "/any/any",
      } as unknown as Request
      const httpmock: any = jest.createMockFromModule("http");
      jest.spyOn(httpmock, "ServerResponse").mock;
      const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
      const next = jest.fn()
      jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,callback:Function)=>{
        callback({
          message:"jwt malformed"
        },"")
      });
      service.use(mockrequest,httpmock.ServerResponse,next);
      expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Token cookie is malformed",400);
    })
  });

});
