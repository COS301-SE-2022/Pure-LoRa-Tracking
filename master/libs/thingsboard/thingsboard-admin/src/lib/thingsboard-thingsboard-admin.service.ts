import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardAdminService {
  private ThingsBoardURL = process.env.TB_URL || 'http://localhost:8080/api';
  constructor(private httpService: HttpService) {}

  private headersReq: {
    'Content-Type': string;
    Authorization: string;
  };

  setToken(token: string): void {
    this.headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
  }

  async getCustomersOfTenant(
    pageSize: number,
    page: number,
    textSearch?: string,
    sortProperty?: string,
    sortOrder?: string
  ): Promise<AdminResponse> {
    const args: string = 'pageSize=' + pageSize + '&' + 'page=' + page;
    //args += textSearch ? '&textSearch=' + textSearch : '';
    //args += sortProperty ? '&sortProperty=' + sortProperty : '';
    //args += sortOrder ? '&sortProperty=' + sortOrder : '';

    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL + '/customers?' + args, {
        headers: this.headersReq,
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
      data: resp.data.data,
    };
  }

  //////////////////////////////////////////////////////////////////

  async getTenants(
    pageSize: number,
    page: number,
    textSearch?: string,
    sortProperty?: string,
    sortOrder?: string
  ): Promise<AdminResponse> {
    const args: string = 'pageSize=' + pageSize + '&' + 'page=' + page;
    //args += textSearch ? '&textSearch=' + textSearch : '';
    //args += sortProperty ? '&sortProperty=' + sortProperty : '';
    //args += sortOrder ? '&sortProperty=' + sortOrder : '';

    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL + '/tenants?' + args, {
        headers: this.headersReq,
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
      data: resp.data.data,
    };
  }

  //////////////////////////////////////////////////////////////////

  async updateTenant(
    id: string,
    title: string,
    region: string,
    tenantProfileID: string,
    country: string,
    city: string,
    address: string,
    address2: string,
    zip: string,
    phone: string,
    email: string,
    additionalInfo: any
  ): Promise<AdminResponse> {
      
      const resp = await firstValueFrom(
        this.httpService.post(
          this.ThingsBoardURL + "/tenant",
          {
            id: {
              id: id,
              entityType: 'TENANT',
            },
            tenantProfileId : {
              id : tenantProfileID,
              entityType : "TENANT_PROFILE"
            },
            country: country,
            title: title,
            region : region,
            city : city,
            address : address,
            address2 : address2,
            zip : zip,
            phone : phone,
            email : email,
            additionalInfo: additionalInfo,
          },
          {
            headers: this.headersReq,
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
  //////////////////////////////////////////////////////////////////

  async getTenantGroupInfo(tenantID : string) : Promise<AdminTenantResponse> {
    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL + '/tenant/' + tenantID, {
        headers: this.headersReq,
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

export interface AdminResponse {
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
      reserves: {
        reserveID: string;
        reserveName: string;
      }[];
    };
  }[];
  type?: string;
}

export interface AdminTenantResponse {
  status: number;
  explanation: string;
  data?: {
    "id": {
      "id": string,
      "entityType": "TENANT"
    },
    "createdTime": number,
    "title": string,
    "name": string,
    "region": string,
    "tenantProfileId": {
      "id": string,
      "entityType": "TENANT_PROFILE"
    },
    "country": string,
    "state": string,
    "city": string,
    "address": string,
    "address2": string,
    "zip": string,
    "phone": string,
    "email": string,
    "additionalInfo": {
      reserves: {
        reserveID: string;
        reserveName: string;
      }[];
    }
  }
}
