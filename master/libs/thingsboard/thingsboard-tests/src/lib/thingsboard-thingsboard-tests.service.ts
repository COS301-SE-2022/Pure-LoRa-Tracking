import { Injectable } from '@nestjs/common';

@Injectable()
export class ThingsboardThingsboardTestsService {
    constructor() {"tests"}

  sysAdmin = 'sysadmin@thingsboard.org';
  sysAdminPassword = 'sysadmin';

  admin = 'reserveadmin@reserve.com';
  adminPassword = 'reserve'

  user = 'reserveuser@reserve.com'
  userPassword = 'reserve'

  UserExample = {
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "USER"
    },
    "createdTime": 1609459200000,
    "tenantId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT"
    },
    "customerId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "CUSTOMER"
    },
    "email": "user@example.com",
    "name": "user@example.com",
    "authority": "CUSTOMER_USER",
    "firstName": "John",
    "lastName": "Doe",
    "additionalInfo": {
      "reserves":[{"reserveName":"reserve","reserveID":"1"}]
    }
  }

  UserAdminExample = {
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "USER"
    },
    "createdTime": 1609459200000,
    "tenantId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT"
    },
    "customerId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "CUSTOMER"
    },
    "email": "user@example.com",
    "name": "user@example.com",
    "authority": "TENANT_ADMIN",
    "firstName": "John",
    "lastName": "Doe",
    "additionalInfo": {}
  }

  UserSysAdminExample = {
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "USER"
    },
    "createdTime": 1609459200000,
    "tenantId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT"
    },
    "customerId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "CUSTOMER"
    },
    "email": "user@example.com",
    "name": "user@example.com",
    "authority": "SYS_ADMIN",
    "firstName": "John",
    "lastName": "Doe",
    "additionalInfo": {}
  }

  UsersExample = {
    "data": [
      {
        "id": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "USER"
        },
        "createdTime": 1609459200000,
        "tenantId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT"
        },
        "customerId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "CUSTOMER"
        },
        "email": "user@example.com",
        "name": "user@example.com",
        "authority": "SYS_ADMIN, TENANT_ADMIN or CUSTOMER_USER",
        "firstName": "John",
        "lastName": "Doe",
        "additionalInfo": {}
      }
    ],
    "totalPages": 0,
    "totalElements": 0,
    "hasNext": false
  }

  CustomerExample = {
    externalId: {
      id: '784f394c-42b6-435a-983c-b7beff2784f9',
      entityType: 'CUSTOMER',
    },
    id: {
      id: '784f394c-42b6-435a-983c-b7beff2784f9',
      entityType: 'CUSTOMER',
    },
    createdTime: 1609459200000,
    title: 'Company A',
    name: 'Company A',
    tenantId: {
      id: '784f394c-42b6-435a-983c-b7beff2784f9',
      entityType: 'TENANT',
    },
    country: 'US',
    state: 'NY',
    city: 'New York',
    address: '42 Broadway Suite 12-400',
    address2: 'string',
    zip: '10004',
    phone: '+1(415)777-7777',
    email: 'example@company.com',
    additionalInfo: {location:[]},
  };

  CustomersExample = {
    data: [
      {
        externalId: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'CUSTOMER',
        },
        id: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'CUSTOMER',
        },
        createdTime: 1609459200000,
        title: 'Company A',
        name: 'Company A',
        tenantId: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'TENANT',
        },
        country: 'US',
        state: 'NY',
        city: 'New York',
        address: '42 Broadway Suite 12-400',
        address2: 'string',
        zip: '10004',
        phone: '+1(415)777-7777',
        email: 'example@company.com',
        additionalInfo: {},
      },
    ],
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
  };

  DeviceCredentialsExample = {
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9"
    },
    "createdTime": 1609459200000,
    "deviceId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "DEVICE"
    },
    "credentialsType": "ACCESS_TOKEN",
    "credentialsId": "Access token or other value that depends on the credentials type",
    "credentialsValue": "Null in case of ACCESS_TOKEN. See model definition."
  }

  TenantsExample = {
    data: [
      {
        id: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'TENANT',
        },
        createdTime: 1609459200000,
        title: 'Company A',
        name: 'Company A',
        region: 'North America',
        tenantProfileId: {
          id: '784f394c-42b6-435a-983c-b7beff2784f9',
          entityType: 'TENANT_PROFILE',
        },
        country: 'US',
        state: 'NY',
        city: 'New York',
        address: '42 Broadway Suite 12-400',
        address2: 'string',
        zip: '10004',
        phone: '+1(415)777-7777',
        email: 'example@company.com',
        additionalInfo: {reserves:[]},
        tenantProfileName: 'Default',
      },
    ],
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
  };

  TenantExample = {
    id: {
      id: '784f394c-42b6-435a-983c-b7beff2784f9',
      entityType: 'TENANT',
    },
    createdTime: 1609459200000,
    title: 'Company A',
    name: 'Company A',
    region: 'North America',
    tenantProfileId: {
      id: '784f394c-42b6-435a-983c-b7beff2784f9',
      entityType: 'TENANT_PROFILE',
    },
    country: 'US',
    state: 'NY',
    city: 'New York',
    address: '42 Broadway Suite 12-400',
    address2: 'string',
    zip: '10004',
    phone: '+1(415)777-7777',
    email: 'example@company.com',
    additionalInfo: {reserves:[]},
    tenantProfileName: 'Default',
  };

  DeviceExample = {
    "externalId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "DEVICE"
    },
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "DEVICE"
    },
    "createdTime": 1609459200000,
    "tenantId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT"
    },
    "customerId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "CUSTOMER"
    },
    "name": "A4B72CCDFF33",
    "type": "Temperature Sensor",
    "label": "Room 234 Sensor",
    "deviceProfileId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "DEVICE_PROFILE"
    },
    "deviceData": {
      "configuration": {},
      "transportConfiguration": {}
    },
    "firmwareId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "OTA_PACKAGE"
    },
    "softwareId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "OTA_PACKAGE"
    },
    "additionalInfo": {
      location : {
        latitude : 1,
        longitude : 2
      }
    }
  }

  DevicesExample = {
    "data": [
      {
        "externalId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "DEVICE"
        },
        "id": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "DEVICE"
        },
        "createdTime": 1609459200000,
        "tenantId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT"
        },
        "customerId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "CUSTOMER"
        },
        "name": "A4B72CCDFF33",
        "type": "Temperature Sensor",
        "label": "Room 234 Sensor",
        "deviceProfileId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "DEVICE_PROFILE"
        },
        "deviceData": {
          "configuration": {},
          "transportConfiguration": {}
        },
        "firmwareId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "OTA_PACKAGE"
        },
        "softwareId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "OTA_PACKAGE"
        },
        "additionalInfo": {}
      }
    ],
    "totalPages": 0,
    "totalElements": 0,
    "hasNext": false
  }

  AssetExample = {
    "externalId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "ASSET"
    },
    "id": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "ASSET"
    },
    "createdTime": 1609459200000,
    "tenantId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "TENANT"
    },
    "customerId": {
      "id": "784f394c-42b6-435a-983c-b7beff2784f9",
      "entityType": "CUSTOMER"
    },
    "name": "Empire State Building",
    "type": "Building",
    "label": "NY Building",
    "additionalInfo": {}
  }

  AssetsExample = {
    "data": [
      {
        "externalId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "ASSET"
        },
        "id": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "ASSET"
        },
        "createdTime": 1609459200000,
        "tenantId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT"
        },
        "customerId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "CUSTOMER"
        },
        "name": "Empire State Building",
        "type": "Building",
        "label": "NY Building",
        "additionalInfo": {},
        "customerTitle": "string",
        "customerIsPublic": false
      }
    ],
    "totalPages": 0,
    "totalElements": 0,
    "hasNext": false
  }

  AssetsReserveExample = {
    "data": [
      {
        "externalId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "ASSET"
        },
        "id": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "ASSET"
        },
        "createdTime": 1609459200000,
        "tenantId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "TENANT"
        },
        "customerId": {
          "id": "784f394c-42b6-435a-983c-b7beff2784f9",
          "entityType": "CUSTOMER"
        },
        "name": "Empire State Building",
        "type": "Reserve",
        "label": "NY Building",
        "additionalInfo": {},
        "customerTitle": "string",
        "customerIsPublic": false
      }
    ],
    "totalPages": 0,
    "totalElements": 0,
    "hasNext": false
  }

  axiosAdminSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.UserAdminExample
  }

  axiosSysAdminSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.UserSysAdminExample
  }

  axiosAssetSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.AssetExample
  }

  axiosAssetsSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.AssetsExample
  }

  axiosAssetsReserveSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.AssetsReserveExample
  }
  

  TelemetryResultExample = {
      longitude : [{value:1, ts:22}, {value:2, ts:22}],
      latitude : [{value:3, ts:22}, {value:4, ts:22}],
  }

  /*DeviceAttributeExample = {
    "result": {latitude:-22,longitude:-23},
    "setOrExpired": true
  }*/

  DeviceAttributeExample = {
    "data": [{latitude:-22,longitude:-23}],
    "setOrExpired": true
  }

  tokenExample = {
    token: 'we12nklJQW',
    refreshToken: 'w3hjkqlbdwejkdn89',
  };

  axiosDeviceAttributeSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.DeviceAttributeExample
  }

  axiosTelemetrySuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.TelemetryResultExample
  }

  axiosDeviceSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.DeviceExample
  }

  axiosDevicesSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.DevicesExample
  }

  axiosDeviceCredentialSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.DeviceCredentialsExample
  }

  axiosUserSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.UserExample
  }

  axiosUsersSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.UsersExample
  }

  axiosTenantSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.TenantExample
  }

  axiosTenantsSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.TenantsExample
  }


  axiosCustomerSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.CustomerExample
  }

  axiosCustomersSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.CustomersExample
  }

  axiosFailureExample = {
    response : {
      data : {
        message : "Not Authorized"
      },
      status : 400,
    }
  }

  axios401FailureExample = {
    response : {
      data : {
        message : "Not Authorized"
      },
      status : 401,
    }
  }

  axios404FailureExample = {
    response : {
      data : {
        message : "Not found"
      },
      status : 404,
    }
  }

  axiosECONNFailureExample = {
    code : "ECONNREFUSED"
  }

  ECONNResponse = {
    status : 500,
    explanation : 'ECONNREFUSED'
  }

  SuccessResponse = {
    status : 200,
    explanation: 'ok'
  }

  FailResponse = {
    status : 400,
    explanation: 'Not Authorized'
  }

  axiosTokenSuccessExample = {
    headers: {},
    config: {},
    status: 200,
    statusText: 'OK',
    data : this.tokenExample
  }

  TBSuccessResponse = {
    status : 'ok'
  }

  TBFailureResponse = {
    status : 'fail'
  }

}
