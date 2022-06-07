export interface userAddInput {
  token: string;
  customerID : string;
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
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
  customerID: string;
}

export interface userResponse {
  status: number;
  explain: string;
  furtherExplain?: string;
  data?: any;
}
