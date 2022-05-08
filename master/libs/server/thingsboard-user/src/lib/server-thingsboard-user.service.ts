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
        })/*.subscribe((resp : AxiosResponse)=> {
            //console.log(resp.data['token']);
            return resp.data;
        })*/
    }
}
