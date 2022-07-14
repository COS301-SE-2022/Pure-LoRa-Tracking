import { Injectable } from '@nestjs/common';

@Injectable()
export class ThingsboardThingsboardTestsService {
    constructor() {"tests"}

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
    additionalInfo: {},
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
        additionalInfo: {},
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
    additionalInfo: {},
    tenantProfileName: 'Default',
  };

  tokenExample = {
    token: 'we12nklJQW',
    refreshToken: 'w3hjkqlbdwejkdn89',
  };

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

}
