export interface userAddInput {
  token: string;
  customerID : string;
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
  reserves : string[];
}

export interface userRemoveInput {
  token: string;
  userID: string;
}

export interface userDisableInput {
  token: string;
  userID: string;
}

export interface userEnableInput {
  token: string;
  userID: string;
}

export interface userInfoInput {
  token: string;
}

export interface userAdminGroups {
  token: string;
}

export interface userResponse {
  status: number;
  explain: string;
  furtherExplain?: string;
  data?: any;
}

export interface usersInfoInput {
  token : string;
  customerID : string;
}
