import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardUserService {
  private ThingsBoardURL = process.env.TB_URL || "http://localhost:8080/api";
  constructor(private httpService: HttpService) {}

  /////////////////////////////////////////////////////////

  async login(name: string, password: string): Promise<UserResponse> {
    const resp = await firstValueFrom(
      this.httpService.post(this.ThingsBoardURL+'/auth/login', {
        username: name,
        password: password,
      })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });
    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
      data : null
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data,
      data : null
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : {
        token : resp.data.token,
        refreshToken : resp.data.refreshToken
      }
    }
  }

  /////////////////////////////////////////////////////

  async logout(token: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL+'/auth/logout',
        {},
        { headers: headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });
    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
      data : null
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data,
      data : null
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : null
    }
  }

  //////////////////////////////////////////////////////////////////////////

    async refreshToken(refreshTokenValue: string) : Promise<UserResponse> {
    if (refreshTokenValue == undefined || refreshTokenValue == "") {
      return {
        status: 400,
        explanation : "token invalid"
      }
    }
    const url = this.ThingsBoardURL+'/auth/token'
    const requestHeaders = {
      'Content-type': 'application/json',
    }
    const resp = await firstValueFrom(
      this.httpService.post(
        url,
        { "refreshToken": refreshTokenValue },
        { headers: requestHeaders }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
      data : null
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data,
      data : null
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : {
        token : resp.data.token,
        refreshToken : resp.data.refreshToken
      }
    }
  }

  //////////////////////////////////////////////////////

  async userInfo(token: string): Promise<any> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL+'/auth/user', {
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

    if (resp.data['authority'] == 'SYS_ADMIN') {
      return {
        code: 200,
        id: resp.data['tenantId']['id'],
        type: 'sysAdmin',
      } 
    }
    else if (resp.data['authority'] == 'TENANT_ADMIN') {
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
      this.httpService.get(this.ThingsBoardURL+'/customer/' + custID, {
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
      this.httpService.delete(this.ThingsBoardURL+'/user/' + userID, {
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
        this.ThingsBoardURL+'/user?sendActivationMail=false',
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
      data:null
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
        this.ThingsBoardURL+'/customer/' +
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

    if(resp.status != 200)
    return {status:resp.status, data:[]} 

    return {status: 200, data:resp['data']};
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
        this.ThingsBoardURL+'/customer',
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
      data:null
    };
  }

  /////////////////////////////////////////////////////////////////

  async deleteReserveGroup(token: string, custID: string): Promise<boolean> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.delete(this.ThingsBoardURL+'/customer/' + custID, {
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
        this.ThingsBoardURL+'/user/' +
          userID +
          '/userCredentialsEnabled?userCredentialsEnabled=false',
        {},
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      console.log(error);
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
        this.ThingsBoardURL+'/user/' +
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
          this.ThingsBoardURL+'/customers?page=0&pageSize=100',
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
  status: number;
  explanation: string;
  data? : {
    token? : string;
    refreshToken? : string;
  }
}
