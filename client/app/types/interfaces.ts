export interface IResponseRegistration{
  firstName?: any,
  lastName?: any,
  email?: any,
  password?: any
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  isActivated: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser
}