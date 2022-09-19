import { Injectable } from '@nestjs/common';
import {
  userAddInput,
  userAdminGroups,
  UserChangeReserveInput,
  userDisableInput,
  userEnableInput,
  userInfoInput,
  userRemoveInput,
  userResponse,
  UserSenserDataInput,
  usersInfoInput,
  userUpdateInput,
} from '../api-user.interface';

import { ThingsboardThingsboardClientService } from '@lora/thingsboard-client';

@Injectable()
export class ApiUserEndpointService {
  constructor(private thingsboardClient: ThingsboardThingsboardClientService) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////

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

      if (content.reserves == undefined || content.reserves.length == 0)
        return {
          status: 400,
          explain: 'no reserves found, there must at least be one',
        };
    }

    this.thingsboardClient.setToken(content.token);

    const resp = await this.thingsboardClient.addUserToReserve(
      content.customerID,
      content.userInfo.email,
      content.userInfo.firstName,
      content.userInfo.lastName,
      content.reserves
    );

    if (resp.status == 'fail')
      return {
        status: 500,
        explain: resp.explanation,
      };

    return {
      status: 200,
      explain: 'ok',
      data: resp.explanation,
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

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
        status: 500,
        explain: resp.explanation,
      };
    else
      return {
        status: 200,
        explain: 'ok',
      };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

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
        status: 500,
        explain: resp.explanation,
      };
    else
      return {
        status: 200,
        explain: 'ok',
      };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

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
        status: 500,
        explain: resp.explanation,
      };
    else
      return {
        status: 200,
        explain: 'ok',
      };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  async UserInfoProcess(content: userInfoInput): Promise<userResponse> {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };
    this.thingsboardClient.setToken(content.token);
    let resp;
    if (content.userID == undefined) {
      resp = await this.thingsboardClient.getUserInfoFromToken();
    } else {
      resp = await this.thingsboardClient.getUserInfoByID(content.userID);
    }
    if (resp.status == 'fail')
      return {
        status: 500,
        explain: resp.explanation,
      };
    return {
      status: 200,
      explain: resp.explanation,
      data: resp.data,
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  async AdminGroupsProcess(content: userAdminGroups): Promise<userResponse> {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };

    this.thingsboardClient.setToken(content.token);
    const response = await this.thingsboardClient.AdminGetCustomers();

    if (response.status == 'fail')
      return {
        status: 500,
        explain: response.explanation,
      };
    return {
      status: 200,
      explain: 'call finished',
      data: response.data,
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  async AdminAllReserveUsersProcess(
    content: usersInfoInput
  ): Promise<userResponse> {
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

    this.thingsboardClient.setToken(content.token);

    const response = await this.thingsboardClient.AdminGetUsersFromReserve(
      content.customerID
    );
    if (response.status == 'fail')
      return {
        status: 500,
        explain: 'Server failed with: ' + response.explanation,
      };

    return {
      status: 200,
      explain: 'ok',
      data: response.data,
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  async UserChangeReserveProcess(
    content: UserChangeReserveInput
  ): Promise<userResponse> {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };
    if (content.reserveID == undefined || content.reserveID == '')
      return {
        status: 400,
        explain: 'reserveID not defined',
      };
    if (content.refreshToken == undefined || content.refreshToken == '')
      return {
        status: 400,
        explain: 'refreshToken not defined',
      };

    this.thingsboardClient.setToken(content.token);

    const response = await this.thingsboardClient.changeReserveForUser(
      content.reserveID
    );

    const tokens = await this.thingsboardClient.refresh(content.refreshToken);
    console.log('tokens :>> ', tokens);

    if (response.status == 'fail')
      return {
        status: 500,
        explain: 'Server failed with: ' + response.explanation,
      };

    return {
      status: 200,
      explain: 'ok',
      furtherExplain: 'refresh the page',
      data: {
        ...response.data,
        ...{ token: tokens.token },
        ...{ refreshToken: tokens.refreshToken },
      },
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  async UserInfoUpdateProcess(content: userUpdateInput): Promise<userResponse> {
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
    if (
      content.userInfo == undefined ||
      content.userInfo.firstName == undefined ||
      content.userInfo.firstName == ''
    )
      return {
        status: 400,
        explain: 'firstname not defined',
      };
    if (
      content.userInfo.lastName == undefined ||
      content.userInfo.lastName == ''
    )
      return {
        status: 400,
        explain: 'lastname not defined',
      };

    this.thingsboardClient.setToken(content.token);
    const resp = await this.thingsboardClient.updateUser(
      content.userID,
      content.userInfo,
      content.reserves
    );

    if (resp.status == 'fail')
      return {
        status: 500,
        explain: resp.explanation,
      };

    return {
      status: 200,
      explain: resp.explanation,
    };
  }

  async UserGetDeviceSensorData(content: UserSenserDataInput) {
    if (content.token == undefined || content.token == '')
      return {
        status: 401,
        explain: 'token missing',
      };

    if (content.DevicUEID == undefined || content.DevicUEID == '')
      return {
        status: 400,
        explain: 'device EUID not defined',
      };

    this.thingsboardClient.setToken(content.token);

    const response = await this.thingsboardClient.getDeviceSensorData(
      content.DevicUEID,
      content.timeStart,
      content.timeStop
    );
    if (response.status != 'ok') {
      return {
        status: 500,
        explain: response.explanation,
      };
    }
    return {
      status: 200,
      explanation: response.status,
      type: 'bar',
      data: response.data,
    };
  }
}
