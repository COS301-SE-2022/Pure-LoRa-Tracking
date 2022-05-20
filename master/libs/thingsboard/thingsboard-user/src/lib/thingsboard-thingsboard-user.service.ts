import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardUserService {
    constructor(private httpService: HttpService) {}

    async login(name: string, password: string) : Promise<AxiosResponse> | Promise<thingsboard_failure> {
        return await firstValueFrom(this.httpService.post('http://localhost:8080/api/auth/login', {
        username: name,
        password: password,
      })).catch((error)=> {
        if(error.response.status==401)
          return new Promise((resolve, reject) => {
            return 
          });
      })
    }
  
    async logout(token: string): Promise<AxiosResponse> {
      const headersReq = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      return await firstValueFrom(this.httpService.post(
        'http://localhost:8080/api/auth/logout',
        {},
        { headers: headersReq }
      ).pipe(
        map(
          Response => Response
        )
      ))
    }
  
    async userInfo(token : string) : Promise<AxiosResponse> {
      const headersReq = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      return firstValueFrom(this.httpService.post(
        'http://localhost:8080/api/auth/user',
        {},
        { headers: headersReq }
      ).pipe(
        map(
          Response => Response
        )
      ))
    }
}
