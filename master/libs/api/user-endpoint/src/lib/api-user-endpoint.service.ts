import { Injectable } from '@nestjs/common';
import {
  userAddInput,
  userDisableInput,
  userEnableInput,
  userInfoInput,
  userRemoveInput,
  userResponse,
} from '../api-user.interface';

import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';

@Injectable()
export class ApiUserEndpointService {
  constructor(private thingsboardClient: ThingsboardThingsboardClientService) {}

  async AddUserProcess(content: userAddInput): Promise<userResponse> {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };

    if (content.customerID == undefined || content.customerID == '')
      return {
        status: 400,
        explain: 'customerID not defined',
      };

    if (content.userInfo == undefined)
      return {
        status: 400,
        explain: 'userInfo not defined',
      };
    else {
      if (content.userInfo.email == undefined || content.userInfo.email == '')
        return {
          status: 400,
          explain: 'no user email found',
        };
      if (
        content.userInfo.firstName == undefined ||
        content.userInfo.firstName == ''
      )
        return {
          status: 400,
          explain: 'no first name found',
        };
      if (
        content.userInfo.lastName == undefined ||
        content.userInfo.lastName == ''
      )
        return {
          status: 400,
          explain: 'no last name found',
        };
    }

    this.thingsboardClient.setToken(content.token);

    const resp = await this.thingsboardClient.addUserToReserve(
      content.customerID,
      content.userInfo.email,
      content.userInfo.firstName,
      content.userInfo.lastName
    );

    if (resp.status == 'fail')
      return {
        status: 400,
        explain: resp.explanation,
      };

    return {
      status: 200,
      explain: 'ok',
      data: resp.explanation,
    };
  }

  async RemoveUserProcess(content: userRemoveInput): Promise<userResponse> {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };

    if (content.userID == undefined || content.userID == '')
      return {
        status: 400,
        explain: 'userID not defined',
      };

    this.thingsboardClient.setToken(content.token);

    const resp = await this.thingsboardClient.removeReserveUser(content.userID);

    if (resp.status == 'fail')
      return {
        status: 400,
        explain: resp.explanation,
      };
    else
      return {
        status: 200,
        explain: 'ok',
      };
  }

  async DisableUserProcess(content: userDisableInput): Promise<userResponse> {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };

    if (content.userID == undefined || content.userID == '')
      return {
        status: 400,
        explain: 'userID not defined',
      };

    this.thingsboardClient.setToken(content.token);
    const resp = await this.thingsboardClient.disableUser(content.userID);
    if (resp.status == 'fail')
      return {
        status: 400,
        explain: resp.explanation,
      };
    else
      return {
        status: 200,
        explain: 'ok',
      };
  }

  async EnableUserProcess(content: userEnableInput): Promise<userResponse> {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };

    if (content.userID == undefined || content.userID == '')
      return {
        status: 400,
        explain: 'userID not defined',
      };

    this.thingsboardClient.setToken(content.token);
    const resp = await this.thingsboardClient.enableUser(content.userID);
    if (resp.status == 'fail')
      return {
        status: 400,
        explain: resp.explanation,
      };
    else
      return {
        status: 200,
        explain: 'ok',
      };
  }

  async UserInfoProcess(content: userInfoInput): Promise<userResponse> {
    return null;
  }
}
