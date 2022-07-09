import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardAdminService {
  private ThingsBoardURL = process.env.TB_URL || 'http://localhost:8080/api';
  constructor(private httpService: HttpService) {}

  async getCustomersOfTenant(
    token: string,
    pageSize: number,
    page: number,
    textSearch?: string,
    sortProperty?: string,
    sortOrder?: string
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    let args: string = 'pageSize=' + pageSize + '&' + 'page=' + page;
    args += textSearch ? '&textSearch=' + textSearch : '';
    args += sortProperty ? '&sortProperty=' + sortProperty : '';
    args += sortOrder ? '&sortProperty=' + sortOrder : '';

    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL + '/api/customers?' + args, {
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
      data: resp.data,
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
