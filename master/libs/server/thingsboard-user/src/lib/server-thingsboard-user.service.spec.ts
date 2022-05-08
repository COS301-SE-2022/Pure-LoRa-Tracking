import { Test } from '@nestjs/testing';
import { ServerThingsboardUserService } from './server-thingsboard-user.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

describe('ServerThingsboardUserService', () => {
  let service: ServerThingsboardUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerThingsboardUserService],
      imports:[HttpModule],
    }).compile();

    service = module.get(ServerThingsboardUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

it('login should return something', () => {
  service.login("liamburgess299@gmail.com","L19m2992").subscribe((resp : AxiosResponse)=> {
    //console.log(resp.data['token']);
    expect(resp.data).toHaveProperty('refreshToken')  
  });
});

});
