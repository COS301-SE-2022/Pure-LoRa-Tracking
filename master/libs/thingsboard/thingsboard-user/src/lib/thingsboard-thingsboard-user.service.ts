import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardUserService {
  constructor(private httpService: HttpService) {}

  async login(name: string, password: string): Promise<AxiosResponse> {
    return await firstValueFrom(
      this.httpService.post('http://localhost:8080/api/auth/login', {
        username: name,
        password: password,
      })
    ).catch((error) => {
      if (error.response == undefined) return null;
      if (error.response.status == 401)
        return new Promise((resolve, reject) => {
          return {
            status: error.response.status,
          };
        });
    });
  }

  async logout(token: string): Promise<AxiosResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return await firstValueFrom(
      this.httpService.post(
        'http://localhost:8080/api/auth/logout',
        {},
        { headers: headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      if (error.response.status == 401)
        return new Promise((resolve, reject) => {
          return {
            status: error.response.status,
          };
        });
    });
  }

  async userInfo(token: string): Promise<any> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return await firstValueFrom(
      this.httpService.get('http://localhost:8080/api/auth/user', {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return null;
      if (error.response.status == 401)
        return {status:401}
    });
  }

  async getUserID(token: string): Promise<{id?:string; type?:string;code:number}> {
    const resp = await this.userInfo(token);
    if (resp.status != 200) {
      return {
        code: resp.status,
      };
    }

    if (resp.data == undefined) {
      return {
        code: 500,
      };
    }

    if (resp.data['authority'] == 'TENANT_ADMIN') {
      return {
        code : 200,
        id: resp.data['tenantId']['id'],
        type: 'admin',
      };
    } else {
      return {
        code : 200,
        id: resp.data['customerId']['id'],
        type: 'user',
      };
    }
  }
}
