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
  static deletePost (id: string | undefined | string[], postId: string): Promise<AxiosResponse<IUser>>{
    return $api.post<IUser>(`/deletepost/${id}`, {postId})
  }
  static addLike (id: string | undefined | string[], postId: string): Promise<AxiosResponse<IUser>>{
    return $api.post<IUser>(`/addlike/${id}`, {postId})
  }
  static deleteLike (id: string | undefined | string[], postId: string): Promise<AxiosResponse<IUser>>{
    return $api.post<IUser>(`/deletelike/${id}`, {postId})
  }
  static getSecondUser (id: string | undefined | string[]): Promise<AxiosResponse<IUser>>{
    return $api.get<IUser>(`/getuser/${id}`)
  }
  static getFriend (friendId: string): Promise<AxiosResponse<IUser>>{
    return $api.get<IUser>(`/getuser/${friendId}`)
  }
  static addFriend (id: string | undefined | string[], friendId: string | undefined | string[]): Promise<AxiosResponse<IUser[]>>{
    return $api.post<IUser[]>(`/addfriend/${id}`, {friendId})
  }
}