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

it('valid login should return token and refreshToken', () => {
  service.login("liamburgess299@gmail.com","L19m2992").subscribe((resp : AxiosResponse)=> {
    expect(resp.data).toHaveProperty('token');
    expect(resp.data).toHaveProperty('refreshToken');
  });
});

it('should logout and return status 200 - OK', ()=> {
  service.login("liamburgess299@gmail.com","L19m2992").subscribe((resp : AxiosResponse)=> {
    service.logout(resp.data['token']).subscribe((resp: AxiosResponse)=> {
      expect(resp.data).toEqual('');
    })
  });
    
 }); 

});
