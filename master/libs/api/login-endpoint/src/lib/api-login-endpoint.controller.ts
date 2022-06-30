import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiLoginEndpointService } from './api-login-endpoint.service';
import { refreshTokenLogin, userLoginData, userLoginResponse } from '../api-login.interface';

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
}
