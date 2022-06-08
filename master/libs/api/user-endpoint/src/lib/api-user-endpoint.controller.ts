import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  userAddInput,
  userAdminGroups,
  userDisableInput,
  userEnableInput,
  userInfoInput,
  userRemoveInput,
  userResponse,
} from '../api-user.interface';
import { ApiUserEndpointService } from './api-user-endpoint.service';

@Controller('user')
export class ApiUserEndpointController {
  constructor(private apiUserEndpointService: ApiUserEndpointService) {}

  @Get()
  upState() {
    return 'reachable';
  }

  @Post('admin/add')
  async AddUserEndpoint(@Body() content: userAddInput): Promise<userResponse> {
    return this.apiUserEndpointService.AddUserProcess(content);
  }

  @Post('admin/remove')
  async RemoveUserEndpoint(
    @Body() content: userRemoveInput
  ): Promise<userResponse> {
    return this.apiUserEndpointService.RemoveUserProcess(content);
  }

  @Post('admin/disable')
  async DisableUserEndpoint(
    @Body() content: userDisableInput
  ): Promise<userResponse> {
    return this.apiUserEndpointService.DisableUserProcess(content);
  }

  @Post('admin/enable')
  async EnableUserEndpoint(
    @Body() content: userEnableInput
  ): Promise<userResponse> {
    return this.apiUserEndpointService.EnableUserProcess(content);
  }

  @Post('info')
  async UserInfoEndpoint(
    @Body() content: userInfoInput
  ): Promise<userResponse> {
    return this.apiUserEndpointService.UserInfoProcess(content);
  }

  @Post('admin/groups')
  async PostGatewayAdd(
    @Body() content: userAdminGroups
  ): Promise<userResponse> {
    return this.apiUserEndpointService.AdminGroupsProcess(content);
  }
}
