export interface userLoginData {
    username: string,
    password: string
}

export interface userLoginResponse {
    status: number,
    explain: string,
    token?: string,
    refreshToken?: string
}
