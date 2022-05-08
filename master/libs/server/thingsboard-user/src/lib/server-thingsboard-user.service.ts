import { HttpService } from '@nestjs/axios';
import { Injectable, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { resolve } from 'path';

@Injectable()
export class ServerThingsboardUserService {
    constructor(private httpService : HttpService) {}

    login(name: string, password: string) : Observable<AxiosResponse<any>> {
        return this.httpService.post('http://localhost:8080/api/auth/login', {
            'username':name,
            'password':password
        })
    }

    logout(jwt : string) : Observable<AxiosResponse<any>> {
        const headersReq = {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+jwt
        };
        return this.httpService.post('http://localhost:8080/api/auth/logout',{},{headers:headersReq});
    }
}
