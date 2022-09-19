import { Test } from '@nestjs/testing';
import { MiddlewareSessionManagementService } from './middleware-session-management.service';
import { ThingsboardThingsboardClientModule } from "@lora/thingsboard-client";
import { Server, ServerResponse } from 'http';

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


  const servermock:Partial<ServerResponse>={ 
    statusCode:100
  }

  function test(other:Request){

  }

  describe("Use should return",()=>{
    
    
  })
});
