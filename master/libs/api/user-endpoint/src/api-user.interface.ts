export interface userAddInput {
  token: string;
  customerID : string;
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
  reserves : {reserveName:string, reserveID:string}[];
}

export interface userUpdateInput {
  token: string;
  userID : string;
  userInfo: {
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

export interface UserChangeReserveInput {
  token : string;
  refreshToken : string;
  reserveID : string;
}


