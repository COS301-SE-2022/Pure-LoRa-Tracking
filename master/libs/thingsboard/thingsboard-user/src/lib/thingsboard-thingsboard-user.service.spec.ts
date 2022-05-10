import { Test } from '@nestjs/testing';
import { ThingsboardThingsboardUserService } from './thingsboard-thingsboard-user.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

describe('ThingsboardThingsboardUserService', () => {
  let service: ThingsboardThingsboardUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ThingsboardThingsboardUserService],
      imports: [HttpModule]
    }).compile();

    service = module.get(ThingsboardThingsboardUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('valid login should return token and refreshToken', () => {
    service
      .login('liamburgess299@gmail.com', 'L19m2992')
      .subscribe((resp : AxiosResponse["data"]) => {
        expect(resp).toHaveProperty('token');
        expect(resp).toHaveProperty('refreshToken');
      });
  });

  it('should logout and return status 200 - OK', () => {
    service
      .login('liamburgess299@gmail.com', 'L19m2992')
      .subscribe((resp : AxiosResponse["data"]) => {
        service.logout(resp['token']).subscribe((resp : AxiosResponse['data']) => {
          expect(resp).toEqual('');
        });
      });
  });
});
