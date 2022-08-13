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
    refreshToken: '23',
    reserveID: '12',
  };

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


    customerResponse = {
      externalId : '',
      id : '',
      tenantId : '',
      createdTime : '',
      additionalInfo : ''
    }

    reserveEndpointResponseExample = {

    }

    tbSuccess =
        { status: 200, explain: "call finished" }

    tbSuccessExplanation = {
      status : 200,
      explanation: "call finished"
    }

  deviceInfosExample = {
    token: 'SJNCKJWNJQQUIBWIU2837HJB1U12BJ',
    customerID: '123',
    deviceIDs: ['122', '123', '124'],
  };

  deviceInfosResponseExample = {
    status: 200,
    explanation: 'ok',
    data: [],
  };

  addSensorExampleInput = {
    token: '123',
    customerID: 'EA34',
    hardwareName: 'Sensor3',
    labelName: 'Animal Sensor 3',
    deviceProfileId: '123456',
    profileType: {
      profileID: '1234567',
      profileName: 'ABCDEF',
    },
  };

  tbFail = { status: 500, explain: 'ECONNREFUSED' };

  tbFailExplanation = { status: 500, explanation: 'ECONNREFUSED' };
}
