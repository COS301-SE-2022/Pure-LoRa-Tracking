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
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
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
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
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
        return error.response.data;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp
    } 
    else if(resp.status != 200) {
      return {
      status : resp.status,
      explanation : resp.message
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

  async userInfo(token: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL+'/auth/user', {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : resp.data
    }
  }

  ///////////////////////////////////////////////////////////

  /*
  TODO change this function to return userID for user
  TODO make a new function to return customer id for a token
  */

  async getUserID(
    token: string
  ): Promise<UserResponse> {
    const resp = await this.userInfo(token);
    if (resp.status != 200) {
      return {
        explanation : resp.explanation,
        status: resp.status,
      };
    }

    if (resp.data == undefined) {
      return {
        explanation : resp.explanation,
        status: resp.status,
      };
    }

    if (resp.data.authority == 'SYS_ADMIN') {
      return {
        status: 200,
        explanation : "ok",
        userID: resp.data['tenantId']['id'],
        type: 'sysAdmin',
      } 
    }
    else if (resp.data['authority'] == 'TENANT_ADMIN') {
      return {
        status: 200,
        explanation : "ok",
        userID: resp.data['tenantId']['id'],
        type: 'admin',
      };
    } else {
      return {
        status: 200,
        explanation : "ok",
        userID: resp.data['customerId']['id'],
        type: 'user',
      };
    }
  }

  //////////////////////////////////////////////////////////////////////

  async userInfoByCustID(token: string, custID: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL+'/customer/' + custID, {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : resp.data
    }
  }

  /////////////////////////////////////////////////////////////////

  async deleteUser(token: string, userID: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.delete(this.ThingsBoardURL+'/user/' + userID, {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
    }
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
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : resp.data
    }
  }

  /////////////////////////////////////////////////////////////////

  /* 
    possibly add a process method
  */
  async GetUsersFromReserve(token: string, custID: string): Promise<UserResponse> {
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
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : resp.data
    }
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
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
      data : resp.data
    }
  }

  /////////////////////////////////////////////////////////////////

  async deleteReserveGroup(token: string, custID: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.delete(this.ThingsBoardURL+'/customer/' + custID, {
        headers: headersReq,
      })
    ).catch((error) => {
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
    }
  }

  /////////////////////////////////////////////////////////////////

  async DisableUser(token: string, userID: string): Promise<UserResponse> {
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
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
    }
  }

  /////////////////////////////////////////////////////////////////

  async EnableUser(token: string, userID: string): Promise<UserResponse> {
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
      if (error.response == undefined) return error.code;
        return error;
    });

    if(resp == "ECONNREFUSED")
    return {
      status : 500,
      explanation : resp,
    } 
    else if(resp.status != 200) {
      return {
      status : resp.response.status,
      explanation : resp.response.data.message,
      }
    }
    return {
      status : resp.status,
      explanation : "ok",
    }
  }

  /////////////////////////////////////////////////////////////////
    async AdminGetCustomers(token: string): Promise<UserResponseCustomers> {
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
        if (error.response == undefined) return error.code;
          return error;
      });
  
      if(resp == "ECONNREFUSED")
      return {
        status : 500,
        explanation : resp,
      } 
      else if(resp.status != 200) {
        return {
        status : resp.response.status,
        explanation : resp.response.data.message,
        }
      }
      return {
        status : resp.status,
        explanation : "ok",
        data : resp.data
      }
    }
}

export interface UserResponse {
  status: number;
  explanation: string;
  data? : {
    token? : string;
    refreshToken? : string;
      "id"?: {
        "id"?: string,
        "entityType"?: string
      },
      "createdTime"?: number
      "tenantId"?: {
        "id"?: string,
        "entityType"?: string
      },
      "customerId"?: {
        "id"?: string,
        "entityType"?: string
      },
      "email"?: string,
      "name"?: string,
      "authority"?: "SYS_ADMIN" | "TENANT_ADMIN" | "CUSTOMER_USER",
      "firstName"?: string,
      "lastName"?: string,
      "additionalInfo"?:any
  }
  type? : string;
  userID? : string;
}

export interface UserResponseCustomers {
  status: number,
  explanation: string,
    "data"?: [
      {
        "id"?: {
          "id"?: string,
          "entityType"?: string
        },
        "createdTime"?: number,
        "title"?: string,
        "name"?: string,
        "tenantId"?: {
          "id"?: string,
          "entityType"?: string
        },
        "country"?: string,
        "state"?: string,
        "city"?: string,
        "address"?: string,
        "address2"?: string,
        "zip"?: string,
        "phone"?: string,
        "email"?: string,
        "additionalInfo"?: any
      }
    ],
    "totalPages"?: 0,
    "totalElements"?: 0,
    "hasNext"?: false,
  type? : string,
  userID? : string,
}
