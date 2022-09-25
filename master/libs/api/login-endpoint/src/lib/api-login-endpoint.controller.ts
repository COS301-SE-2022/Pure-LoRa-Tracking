import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiLoginEndpointService } from './api-login-endpoint.service';
import { refreshTokenLogin, userLoginData, userLoginResponse,twofaauth } from '../api-login.interface';

@Controller('login')
export class ApiLoginEndpointController {
  constructor(private apiLoginEndpointService: ApiLoginEndpointService) { }
  
  @Get()
  upState() {
    return 'Login reachable';
  }

  @Post('user')
  async userLogin(@Body() content: userLoginData): Promise<userLoginResponse>{
    return await this.apiLoginEndpointService.doLogin(content);
  }

  @Post('refreshTokenLogin')
  async refreshTokenLogin(@Body() content:refreshTokenLogin):Promise<userLoginResponse>{
    return await this.apiLoginEndpointService.doRefreshTokenLogin(content);
  }

  @Post('2faVerify')
  async do2faVerify(@Body() content:twofaauth):Promise<userLoginResponse>{
    return await this.apiLoginEndpointService.do2faAuth(content);
  }

  @Post('2faCheck')
  async do2faCheck(@Body() content:twofaauth):Promise<userLoginResponse>{
    return await this.apiLoginEndpointService.do2faCheck(content);
  }

}

@Controller('logout')
export class ApiLogoutEndpointController {
  constructor(private apiLoginEndpointService: ApiLoginEndpointService) { }
  @Post('')
  async logout(@Body() content:{token:string}) : Promise<userLoginResponse> {
    return await this.apiLoginEndpointService.processLogout(content);
  }
}
