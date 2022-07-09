import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardReserveService {
  private ThingsBoardURL = process.env.TB_URL || 'http://localhost:8080/api';
  constructor(private httpService: HttpService) {}

  async createReserveGroup(
    token: string,
    email: string,
    title: string
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL + '/customer',
        {
          email: email,
          title: title,
        },
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });

    if (resp == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: resp,
      };
    else if (resp.status != 200) {
      return {
        status: resp.response.status,
        explanation: resp.response.data.message,
      };
    }
    return {
      status: resp.status,
      explanation: 'ok',
      data: resp.data,
    };
  }

  async deleteReserveGroup(
    token: string,
    custID: string
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.delete(this.ThingsBoardURL + '/customer/' + custID, {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });

    if (resp == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: resp,
      };
    else if (resp.status != 200) {
      return {
        status: resp.response.status,
        explanation: resp.response.data.message,
      };
    }
    return {
      status: resp.status,
      explanation: 'ok',
    };
  }
}

export interface UserResponse {
  status: number;
  explanation: string;
  data?: {
    token?: string;
    refreshToken?: string;
    id?: {
      id?: string;
      entityType?: string;
    };
    createdTime?: number;
    tenantId?: {
      id?: string;
      entityType?: string;
    };
    customerId?: {
      id?: string;
      entityType?: string;
    };
    email?: string;
    name?: string;
    authority?: 'SYS_ADMIN' | 'TENANT_ADMIN' | 'CUSTOMER_USER';
    firstName?: string;
    lastName?: string;
    additionalInfo?: {
      reserves?: string[];
    };
  };
  type?: string;
}
