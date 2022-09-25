import { Test } from '@nestjs/testing';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';
import { ThingsboardThingsboardClientModule } from "@lora/thingsboard-client";
import { IncomingMessage, Server, ServerResponse } from 'http';
import { Header } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { of } from 'rxjs';
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

  // describe("JWT tests", () => {
    
  //   it("Verify should be called with the right cookie",()=>{
  //     const mockrequest = {
  //       headers:{
  //         "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=any"
  //       },
  //       url: "/any/any",
  //     } as unknown as Request
  //     const httpmock: any = jest.createMockFromModule("http");
  //     jest.spyOn(httpmock, "ServerResponse").mock;
  //     const next = jest.fn()
  //     jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,callback:CallableFunction)=>{
  //       expect(token).toEqual("MYTOKEN");
  //     });
  //     service.use(mockrequest,httpmock.ServerResponse,next);
  //     expect(jwt.verify).toBeCalled();
  //   })

  //   it("If malformed -> Fail",()=>{
  //     const mockrequest = {
  //       headers:{
  //         "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=any"
  //       },
  //       url: "/any/any",
  //     } as unknown as Request
  //     const httpmock: any = jest.createMockFromModule("http");
  //     jest.spyOn(httpmock, "ServerResponse").mock;
  //     const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
  //     const next = jest.fn()
  //     jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,{},callback:CallableFunction)=>{
  //       callback({
  //         message:"jwt malformed"
  //       },"")
  //     });
  //     service.use(mockrequest,httpmock.ServerResponse,next);
  //     expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Token cookie is malformed",400);
  //   })

  //   it("If invalid signiture -> Fail",()=>{
  //     const mockrequest = {
  //       headers:{
  //         "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=any"
  //       },
  //       url: "/any/any",
  //     } as unknown as Request
  //     const httpmock: any = jest.createMockFromModule("http");
  //     jest.spyOn(httpmock, "ServerResponse").mock;
  //     const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
  //     const next = jest.fn()
  //     jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,{},callback:CallableFunction)=>{
  //       callback({
  //         message:"invalid signature"
  //       },"")
  //     });
  //     service.use(mockrequest,httpmock.ServerResponse,next);
      
  //     expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Token cookie is invalid",400);
  //   })
  
  //   it("Expired -> Call thingsboard",()=>{
  //     const mockrequest = {
  //       headers:{
  //         "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=TESTTOKEN"
  //       },
  //       url: "/any/any",
  //     } as unknown as Request
  //     const httpmock: any = jest.createMockFromModule("http");
  //     jest.spyOn(httpmock, "ServerResponse").mock;
  //     const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
  //     const next = jest.fn()
  //     jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,{},callback:CallableFunction)=>{
  //       callback({
  //         message:"jwt expired"
  //       },"")
  //     });
  //     jest.spyOn(service.TBClient,"refresh").mockResolvedValueOnce({
  //       status: "fail",
  //       explanation: "",
  //       token: "string",
  //       refreshToken: "1"
  //     });
  //     service.use(mockrequest,httpmock.ServerResponse,next);
  //     expect(service.TBClient.refresh).toBeCalledWith("TESTTOKEN")
  //   })

    // it("Expired -> Fail",()=>{
    //   const mockrequest = {
    //     headers:{
    //       "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=any"
    //     },
    //     url: "/any/any",
    //   } as unknown as Request
    //   const httpmock: any = jest.createMockFromModule("http");
    //   jest.spyOn(httpmock, "ServerResponse").mock;
    //   const next = jest.fn()
    //   jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,callback:Function)=>{
    //     callback({
    //       message:"jwt expired"
    //     },"")
    //   });
    //   const tbrequest=jest.spyOn(service.TBClient,"refresh").mockResolvedValueOnce({
    //     status: "fail",
    //     explanation: "",
    //     token: "string",
    //     refreshToken: "1"
    //   });
    //   const failedrequest=jest.spyOn(service,"failedrequest").mockImplementation();
    //   service.use(mockrequest,httpmock.ServerResponse,next);
    //   expect(failedrequest).toBeCalledWith(httpmock.ServerResponse,"Could not refresh Token Or Token Invalid",401);
    // })

    // it("Success refresh -> correct headers set -> call next",()=>{
    //   const mockrequest = {
    //     headers:{
    //       "cookie":"PURELORA_TOKEN=MYTOKEN;PURELORA_REFRESHTOKEN=any"
    //     },
    //     body:{

    //     },
    //     url: "/any/any",
    //   } as unknown as Request
    //   const httpmock: any = jest.createMockFromModule("http");
    //   const mockresponse=jest.spyOn(httpmock, "ServerResponse").mock;
    //   jest.spyOn(httpmock.ServerResponse,"setHeader").mockImplementation()
    //   const next = jest.fn()
    //   jest.spyOn(jwt,"verify").mockImplementationOnce((token,secret,callback:Function)=>{
    //     callback({
    //       message:"jwt expired"
    //     },"")
    //   });
    //   const tbrequest=jest.spyOn(service.TBClient,"refresh").mockResolvedValueOnce({
    //     status: "ok",
    //     explanation: "",
    //     token: "NEWTOKEN",
    //     refreshToken: "NEWREFESHTOKEN"
    //   });
      
    //   service.use(mockrequest,httpmock.ServerResponse,next);
      
    // })

  // });

});
