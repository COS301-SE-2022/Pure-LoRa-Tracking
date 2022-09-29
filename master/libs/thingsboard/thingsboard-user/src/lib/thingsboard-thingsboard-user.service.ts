import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ThingsboardThingsboardUserService {
  private ThingsBoardURL = process.env.TB_URL || 'http://localhost:8080/api';
  constructor(private httpService: HttpService) { }

  /////////////////////////////////////////////////////////

  async login(name: string, password: string): Promise<UserResponse> {
    const resp = await firstValueFrom(
      this.httpService.post(this.ThingsBoardURL + '/auth/login', {
        username: name,
        password: password,
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
      data: {
        token: resp.data.token,
        refreshToken: resp.data.refreshToken,
      },
    };
  }

  /////////////////////////////////////////////////////

  async logout(token: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL + '/auth/logout',
        {},
        { headers: headersReq }
      )
    ).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });
    if (resp == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: resp,
        data: null,
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

  //////////////////////////////////////////////////////////////////////////

  async refreshToken(refreshTokenValue: string): Promise<UserResponse> {
    if (refreshTokenValue == undefined || refreshTokenValue == '') {
      return {
        status: 400,
        explanation: 'token invalid',
      };
    }
    const url = this.ThingsBoardURL + '/auth/token';
    const requestHeaders = {
      'Content-type': 'application/json',
    };
    const resp = await firstValueFrom(
      this.httpService.post(
        url,
        { refreshToken: refreshTokenValue },
        { headers: requestHeaders }
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

  //////////////////////////////////////////////////////

  async userInfo(token: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL + '/auth/user', {
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

  //////////////////////////////////////////////////////

  async userInfoByUserID(token: string, userID: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(
      this.httpService.get(this.ThingsBoardURL + '/user/' + userID, {
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

  /////////////////////////////////////////////////////////////////

  async deleteUser(token: string, userID: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.delete(this.ThingsBoardURL + '/user/' + userID, {
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

  /////////////////////////////////////////////////////////////////

  async createReserveUser(
    token: string,
    custID: string,
    email: string,
    authority: 'TENANT_ADMIN' | 'CUSTOMER_USER',
    firstName: string,
    lastName: string,
    reserves: { reserveName: string, reserveID: string }[]
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL + '/user?sendActivationMail=true',
        {
          email: email,
          customerId: {
            id: custID,
            entityType: 'CUSTOMER',
          },
          authority: authority,
          firstName: firstName,
          lastName: lastName,
          additionalInfo: {
            reserves: reserves,
          },
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

  /////////////////////////////////////////////////////////////////

  async changeReserveForUser(
    token: string,
    tenantID: string,
    entityID: string,
    custID: string,
    email: string,
    firstName: string,
    lastName: string,
    reserves: { reserveName: string, reserveID: string }[]
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const authority = 'CUSTOMER_USER';

    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL + '/user?sendActivationMail=true',
        {
          id: {
            id: entityID,
            entityType: 'USER',
          },
          customerId: {
            id: custID,
            entityType: 'CUSTOMER',
          },
          tenantId: {
            id: tenantID,
            entityType: 'TENANT',
          },
          authority: authority,
          email: email,
          firstName: firstName,
          lastName: lastName,
          additionalInfo: {
            reserves: reserves,
          },
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

  /////////////////////////////////////////////////////////////////

  /* 
    possibly add a process method
  */
  async GetUsersFromReserve(
    token: string,
    custID: string
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.get(
        this.ThingsBoardURL +
        '/customer/' +
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

  /////////////////////////////////////////////////////////////////

  async DisableUser(token: string, userID: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL +
        '/user/' +
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

  /////////////////////////////////////////////////////////////////

  async EnableUser(token: string, userID: string): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL +
        '/user/' +
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

  /////////////////////////////////////////////////////////////////

  async AdminGetCustomers(token: string): Promise<UserResponseCustomers> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const resp = await firstValueFrom(
      this.httpService.get(
        this.ThingsBoardURL + '/customers?page=0&pageSize=100',
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

  /////////////////////////////////////////////////////////////////

  async UpdateUserInfo(
    token: string,
    userID: string,
    tenantID: string,
    customerID: string,
    email: string,
    authority: string,
    firstname: string,
    lastname: string,
    additionalInfo: any,
  ): Promise<UserResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    
    //apparently we dont need the email change
    // console.log("emailchange: " + emailchange);
    // const details=emailchange?"/user?sendActivationMail=true":"/user?sendActivationMail=false";
    // console.log("details: " + details);
    
    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL + "/user?sendActivationMail=false",
        {
          id: {
            id: userID,
            entityType: 'USER',
          },
          customerId: {
            id: customerID,
            entityType: 'CUSTOMER',
          },
          tenantId: {
            id: tenantID,
            entityType: 'TENANT',
          },
          authority: authority,
          email: email,
          firstName: firstname,
          lastName: lastname,
          additionalInfo: additionalInfo,
        },
        {
          headers: headersReq,
        }
      )
    ).catch((error) => {
      console.log(error);
      if (error.response == undefined) return error.code;
      return error;
    });

    console.log("logged ",resp);

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

  async generate2FA(token: string): Promise<twofaResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(this.httpService.post(this.ThingsBoardURL + "/2fa/account/config/generate?providerType=TOTP", {}, {
      headers: headersReq
    })).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });

    if (resp == 'ECONNREFUSED')
      return {
        status: 500,
        explanation: resp,
      };

    else if(resp.status != 200) {
      return {
        status: 500,
        explanation: "Something went wrong"
      }
    }

    return {
      status: resp.status,
      explanation: 'ok',
      data: resp.data
    }



  }

  async verify2FA(token: string, code: string,authurl:string): Promise<twofaResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(this.httpService.post(this.ThingsBoardURL + "/2fa/account/config?verificationCode="+code, {
      providerType: "TOTP",
      useByDefault: true,
      authUrl:authurl
    }, {
      headers: headersReq
    })).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });
    
    if(resp.data!=undefined){
      return {
        status: resp.status,
        explanation: 'ok',
      }
    }

    if (resp == 'ECONNREFUSED')
    return {
      status: 500,
      explanation: resp.response.data,
    };
    else if(resp.response?.data.message=="Verification code is incorrect"){
      return {
        status:400,
        explanation: "Verification code is incorrect",
      }
    }
    else if(resp.response?.data.message=="2FA provider is already configured"){
      return {
        status:400,
        explanation: "2FA provider is already configured",
      }
    }
    else if(resp.status != 200) {
      return {
        status: 500,
        explanation: "Something went wrong"
      }
    }

    if(resp.response?.data?.configs?.TOTP==undefined){
      return {
        status: 500,
        explanation: "Something went wrong"
      }
    }
    return {
      status: 500,
      explanation: 'fail'
    }

  }

  async check2fa(token: string,authcode:string): Promise<twofaResponse> {
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const resp = await firstValueFrom(this.httpService.post(this.ThingsBoardURL + "/auth/2fa/verification/check?providerType=TOTP&verificationCode="+authcode, {
      
    }, {
      headers: headersReq
    })).catch((error) => {
      if (error.response == undefined) return error.code;
      return error;
    });


    if(resp.data!=undefined){
      return {
        status: resp.status,
        explanation: 'ok',
        data:resp.data
      }
    }

    if (resp == 'ECONNREFUSED')
    return {
      status: 500,
      explanation: resp,
    };

    else if(resp.response.data.status==400&&resp.response.data.message=="Verification code is incorrect"){
      return {
        status: 400,
        explanation: "Verification code is incorrect"
      }
    }
    
    else if(resp.status != 200) {
      return {
        status: 500,
        explanation: "Something went wrong"
      }
    }

    if(resp.data?.configs?.TOTP==undefined){
      return {
        status: 500,
        explanation: "Something went wrong"
      }
    }
    
    return {
      status: 500,
      explanation: "Something went wrong"
    }
  }

  
  async resetLogin(email:string) {
    const resp = await firstValueFrom(
      this.httpService.post(
        this.ThingsBoardURL +
          '/noauth/resetPasswordByEmail',
        {"email":email},
        {}
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
    };
  }

  async check2FAEnabled(token:string):Promise<boolean>{
    const headersReq = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    
    const resp = await firstValueFrom(this.httpService.get(this.ThingsBoardURL + "/2fa/providers",{
      headers: headersReq
    }));
    const array=resp.data;
    if(array.includes('TOTP'))return true;
    return false;
  }

}






/////////////////////////////////////////////////////////////////

export interface twofaResponse {
  status: number;
  explanation: string;
  data?: any;
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
      reserves?: {tenantID: string, reserveName:string, reserveID:string}[];
    };
  };
  type?: string;
}

export interface UserResponseCustomers {
  status: number;
  explanation: string;
  data?: [
    {
      id?: {
        id?: string;
        entityType?: string;
      };
      createdTime?: number;
      title?: string;
      name?: string;
      tenantId?: {
        id?: string;
        entityType?: string;
      };
      country?: string;
      state?: string;
      city?: string;
      address?: string;
      address2?: string;
      zip?: string;
      phone?: string;
      email?: string;
      additionalInfo?: {
        reserve?: string[];
      };
    }
  ];
  totalPages?: 0;
  totalElements?: 0;
  hasNext?: false;
  type?: string;
  userID?: string;
}
