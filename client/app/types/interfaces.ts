export interface IPost {
  _id?: string;
  text: string;
  image: string;
  likes: number;
  comments: any;
  date: string;
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  id?: string;
  _id?: string;
  isActivated: boolean;
  posts: Array<IPost>
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser
}

export interface IResponseRegistration{
  firstName?: string | any,
  lastName?: string | any,
  email?: string | any,
  password?: string | any,
  avatarPath?: string | any
}

export interface IResponseLogin{
  email?: string | any,
  password?: string | any
}

export interface INavLInk {
  img: any,
  title: string,
  link: string
}