import { IUser } from "@/types/interfaces";
import { AxiosResponse } from "axios";
import $api from "../http";

export default class UserService {
  static fetchUsers (): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users')
  }
  static changeAvatar (id: string | undefined | string[], newAvatar: string): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>(`/changeavatar/${id}`, {newAvatar})
  }
  static addPost (id: string | undefined | string[], image: string, text: string): Promise<AxiosResponse<IUser>>{
    return $api.post<IUser>(`/addpost/${id}`, {text, image})
  }
}