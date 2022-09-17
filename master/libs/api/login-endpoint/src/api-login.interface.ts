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
    reserves? : {reserveName:string, reserveID:string}[]
}

export interface refreshTokenLogin{
    refreshToken:string
}