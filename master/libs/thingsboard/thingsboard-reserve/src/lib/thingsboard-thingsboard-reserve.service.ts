import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardReserveService {
  private ThingsBoardURL = process.env.TB_URL || 'http://localhost:8080/api';
  constructor(private httpService: HttpService) {}

  private headersReq: { 'Content-Type': string; Authorization: string; };

  setToken(token : string) : void {
    this.headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
  }

  // TODO extend for all fields in customer group info
  async createReserveGroup(
    email: string,
    title: string,
    location? : {
      coordinates : {
          latitude : number;
          longitude : number;
      } [];
      center : {
          latitude : number;
          longitude : number;
      }
  }
  ): Promise<CustomerInfoResponse> {
    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL + '/customer',
        {
          email: email,
          title: title,
          additionalInfo : {location}
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async deleteReserveGroup(
    token: string,
    custID: string
  ): Promise<reserveResponse> {
    const resp = await firstValueFrom(
      this.httpService.delete(this.ThingsBoardURL + '/customer/' + custID, {
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
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async setReservePerimeter() : Promise<reserveResponse> {
    // TODO
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export interface reserveResponse {
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

export interface CustomerInfoResponse {
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
      };
    }
  }
}
