import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class ThingsboardThingsboardUserService {
    constructor(private httpService: HttpService) {}

    login(name: string, password: string) : Observable<AxiosResponse['data']> {
        return this.httpService.post('http://localhost:8080/api/auth/login', {
        username: name,
        password: password,
      }).pipe(
        map(
          Response => Response.data
        )
      )
    }
  
    logout(token: string): Observable<AxiosResponse> {
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
          Response => Response
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
