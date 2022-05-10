import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ThingsboardThingsboardUserService {
    constructor(private httpService: HttpService) {}

    login(name: string, password: string) : AxiosResponse['data'] {
        return this.httpService.post('http://localhost:8080/api/auth/login', {
        username: name,
        password: password,
      }).pipe(
        map(
          Response => Response.data
        )
      )
    }
  
    logout(token: string): Observable<AxiosResponse['data']> {
      const headersReq = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      return this.httpService.post(
        'http://localhost:8080/api/auth/logout',
        {},
        { headers: headersReq }
      ).pipe(
        map(
          Response => Response.data
        )
      )
    }
  
    userInfo(token : string) : Observable<AxiosResponse['data']> {
      const headersReq = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      return this.httpService.post(
        'http://localhost:8080/api/auth/user',
        {},
        { headers: headersReq }
      ).pipe(
        map(
          Response => Response.data
        )
      ) 
    }
}
