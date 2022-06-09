import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardUserService {
  constructor(private httpService: HttpService) {}

  /////////////////////////////////////////////////////////

  async login(name: string, password: string): Promise<AxiosResponse> {
    return await firstValueFrom(
      this.httpService.post('http://127.0.0.1:9090/api/auth/login', {
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

  /////////////////////////////////////////////////////

  async logout(token: string): Promise<AxiosResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return await firstValueFrom(
      this.httpService.post(
        'http://localhost:9090/api/auth/logout',
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

    async refreshToken(refreshTokenValue: string) {
    if (refreshTokenValue == undefined || refreshTokenValue == "") {
      return {
        status: 400
      }
    }
    const url = 'http://localhost:9090/api/auth/token'
    const requestHeaders = {
      'Content-type': 'application/json',
    }
    return await firstValueFrom(
      this.httpService.post(
        url,
        { "refreshToken": refreshTokenValue },
        { headers: requestHeaders }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      else {
        return new Promise((resolve, reject) => {
          return {
            status: error.response.status
          };
        });
      };
    });
    
  }

  //////////////////////////////////////////////////////

  async userInfo(token: string): Promise<any> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return await firstValueFrom(
      this.httpService.get('http://localhost:9090/api/auth/user', {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return null;
      return { status: error.response.status };
    });
  }

  ///////////////////////////////////////////////////////////

  async getUserID(
    token: string
  ): Promise<{ id?: string; type?: string; code: number }> {
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
        code: 200,
        id: resp.data['tenantId']['id'],
        type: 'admin',
      };
    } else {
      return {
        code: 200,
        id: resp.data['customerId']['id'],
        type: 'user',
      };
    }
  }

  //////////////////////////////////////////////////////////////////////

  async userInfoByCustID(token: string, custID: string): Promise<any> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    return await firstValueFrom(
      this.httpService.get('http://localhost:9090/api/customer/' + custID, {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return null;
      return { status: error.response.status };
    });
  }

  /////////////////////////////////////////////////////////////////

  async deleteUser(token: string, userID: string): Promise<boolean> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.delete('http://localhost:9090/api/user/' + userID, {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return null;
      return { status: error.response.status };
    });

    return resp.status == 200;
  }

  /////////////////////////////////////////////////////////////////

  async createReserveUser(
    token: string,
    custID: string,
    email: string,
    authority: 'TENANT_ADMIN' | 'CUSTOMER_USER',
    firstName: string,
    lastName: string
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.post(
        'http://localhost:9090/api/user?sendActivationMail=false',
        {
          email: email,
          customerId: {
            id: custID,
            entityType: 'CUSTOMER',
          },
          authority: authority,
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });

    return {
      status: resp.status,
      explanation: resp.data,
    };
  }

  /////////////////////////////////////////////////////////////////

  /* 
    possibly add a process method
  */
  async GetUsersFromReserve(token: string, custID: string): Promise<any> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.get(
        'http://localhost:9090/api/customer/' +
          custID +
          '/users?page=0&pageSize=100',
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      return { status: error.response.status };
    });

    return resp['data'];
  }

  /////////////////////////////////////////////////////////////////

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
        'http://localhost:9090/api/customer',
        {
          email: email,
          title: title,
        },
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });

    return {
      status: resp.status,
      explanation: resp.data,
    };
  }

  /////////////////////////////////////////////////////////////////

  async deleteReserveGroup(token: string, custID: string): Promise<boolean> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.delete('http://localhost:9090/api/customer/' + custID, {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return null;
      return { status: error.response.status };
    });

    return resp.status == 200;
  }

  /////////////////////////////////////////////////////////////////

  async DisableUser(token: string, userID: string): Promise<boolean> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.post(
        'http://localhost:9090/api/user/' +
          userID +
          '/userCredentialsEnabled?userCredentialsEnabled=false',
        {},
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });

    return resp.status == 200;
  }

  /////////////////////////////////////////////////////////////////

  async EnableUser(token: string, userID: string): Promise<boolean> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.post(
        'http://localhost:9090/api/user/' +
          userID +
          '/userCredentialsEnabled?userCredentialsEnabled=true',
        {},
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      if (error.response == undefined) return null;
      return {
        status: error.response.status,
        data: error.response.data.message,
      };
    });

    return resp.status == 200;
  }

  /////////////////////////////////////////////////////////////////
    async AdminGetCustomers(token: string): Promise<{data:any, status:number}> {
      const headersReq = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
  
      const resp = await firstValueFrom(
        this.httpService.get(
          'http://localhost:9090/api/customers?page=0&pageSize=100',
          {
            headers: headersReq,
          }
        )
      ).catch((error) => {
        if (error.response == undefined) return null;
        return { status: error.response.status };
      });
  

      return {
        status : resp.status,
        data : resp['data']
      }
    }

}

export interface UserResponse {
  explanation: string;
  status: number;
}
