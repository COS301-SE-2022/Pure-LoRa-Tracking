import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  userAddInput,
  userAdminGroups,
  UserChangeReserveInput,
  userDisableInput,
  userEnableInput,
  userInfoInput,
  userRemoveInput,
  userResponse,
  usersInfoInput,
  userUpdateInput,
} from '../api-user.interface';
import { ApiUserEndpointService } from './api-user-endpoint.service';

@Controller('user')
export class ApiUserEndpointController {
  constructor(private apiUserEndpointService: ApiUserEndpointService) { }

  @Get()
  upState() {
    return 'reachable';
  }

  /* Move user to new reserve which they are a part of */
  @Post('reserve/change')
  async changeReserveEndpoint(@Body() content: UserChangeReserveInput): Promise<userResponse> {
    return this.apiUserEndpointService.UserChangeReserveProcess(content);
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

  /* Get user info from token/cookie */
  @Post('info')
  async UserInfoEndpoint(
    @Body() content: userInfoInput
  ): Promise<userResponse> {
    return this.apiUserEndpointService.UserInfoProcess(content);
  }

  /* Get user info from token/cookie */
  @Post('info/details')
  async UserInfoUpdateEndpoint(
    @Body() content: userUpdateInput
  ): Promise<userResponse> {
    return this.apiUserEndpointService.UserInfoUpdateProcess(content);
  }

  /* Get all reserves admin is incharge of */
  @Post('admin/groups')
  async PostGatewayAdd(
    @Body() content: userAdminGroups
  ): Promise<userResponse> {
    return this.apiUserEndpointService.AdminGroupsProcess(content);
  }

  /* Get all users belonging to a reserve */
  @Post('admin/reserve/all')
  async GetAllUsers(
    @Body() content: usersInfoInput
  ): Promise<userResponse> {
    return this.apiUserEndpointService.AdminAllReserveUsersProcess(content);
  }
}
