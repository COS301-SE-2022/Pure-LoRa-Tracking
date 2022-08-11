import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiApiTestingService {
    userEndpointExample = {
        token: '123',
        customerID: 'cid',
        userInfo: {
            email: 'email',
            firstName: 'fname',
            lastName: 'lname',
        },
        reserves: [{ reserveName: 'rname', reserveID: 'rid' }],
        userID: 'uid',
        refreshToken: "23",
        reserveID: "12"
    }

    reserveEndpointExample = {
        token: '123',
        NameOfReserve: "rietvlei",
        email: "rietvlei@reserve.com",
        reserveID : "sas2132-13swadw-123asdwe-123gf",
        location: {
            features: [{
              type: 'map',
              properties: "",
              geometry: {
                type: 'location',
                coordinates: [],
              }
            }]
          }
    }

    reserveEndpointResponseExample = {

    }

    tbSuccess =
        { status: 200, explain: "call finished" }

    tbFail = 
    { status : 500, explain : "ECONNREFUSED" }
}
