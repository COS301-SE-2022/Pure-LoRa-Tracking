import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiApiTestingService {
    userEndpointExample = {
        token: '123',
        customerID : 'cid',
        userInfo: {
          email: 'email',
          firstName: 'fname',
          lastName: 'lname',
        },
        reserves : [{reserveName:'rname', reserveID:'rid'}],
        userID:'uid'
    }

    tbSuccess = {
        status : 'ok'
    }
}
