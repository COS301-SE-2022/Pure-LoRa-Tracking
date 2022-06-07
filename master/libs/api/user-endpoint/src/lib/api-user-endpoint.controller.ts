import { Controller, Get, Post } from '@nestjs/common';
import { ApiUserEndpointService } from './api-user-endpoint.service';

@Controller('user')
export class ApiUserEndpointController {
  constructor(private apiUserEndpointService: ApiUserEndpointService) {}

  @Get()
  upState() {
    return 'reachable';
  }

  @Post('admin/add') 
  AddUserEndpoint() {
    return null;
  }

  @Post('admin/remove') 
  RemoveUserEndpoint() {
    return null;
  }

  @Post('admin/disable')
  DisableUserEndpoint() {
    return null;
  }

  @Post('info')
  UserInfoEndpoint() {
    return null;
  }

}
