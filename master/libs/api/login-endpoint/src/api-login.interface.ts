export interface userLoginData {
    username: string,
    password: string
}

export interface userLoginResponse {
    status: number,
    explain: string,
    token?: string,
    refreshToken?: string,
    userID?: string,
    reserveID?: string,
    has2fa?: boolean,
    reserves? : {reserveName:string, reserveID:string}[]
}

export interface userInitLoginResponse {
    status: number,
    explain: string,
    authURL?: string,
    token?: string,
    has2fa?: boolean,
}


export interface refreshTokenLogin{
    refreshToken:string
}

export interface Input2Fa{
    token:string,
    authcode:string
    authurl:string
}

export interface twofaauth{
    token:string,
    authcode:string,
    authurl:string
}
