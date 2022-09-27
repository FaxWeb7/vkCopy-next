import { IUser } from "@/types/interfaces";
import {makeAutoObservable} from 'mobx'
import AuthService from "../service/AuthService";
import { AuthResponse } from "@/types/interfaces";
import axios from "axios";
import { API_URL } from "@/constants/constants"; 
import UserService from "@/service/UserService";

export default class Store {
  user = {} as IUser;
  secondUser = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean){
    this.isAuth = bool;
  }

  setUser(user: IUser){
    this.user = user;
  }

  setLoading(bool: boolean){
    this.isLoading = bool
  }

  setSecondUser(user: IUser){
    this.secondUser = user
  }
  
  async login(email: string, password: string) {
    try{
      const response = await AuthService.login(email, password);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user)
    } catch(e: any){
      console.log(e?.response?.data?.message)
      return e?.response?.data?.message
    }
  }

  async registration(email: string, password: string, firstName: string, lastName: string, avatarPath: string) {
    try{
      const response = await AuthService.registration(email, password, firstName, lastName, avatarPath);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user)
    } catch(e: any){
      console.log(e?.response?.data?.message)
      return e?.response?.data?.message
    }
  }

  async logout() {
    try{
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async checkAuth () {
    this.setLoading(true)
    try{
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async changeAvatar (id: string | undefined | string[], newAvatar: string) {
    try{
      const response = await UserService.changeAvatar(id, newAvatar);
      this.setUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async addPost (id: string | undefined | string[], image: string, text: string){
    try{
      const response = await UserService.addPost(id, image, text);
      this.setUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async deletePost (id: string | undefined | string[], postId: string){
    try{
      const response = await UserService.deletePost(id, postId);
      this.setUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async addLike (id: string | undefined | string[], postId: string){
    try{
      const response = await UserService.addLike(id, postId);
      this.setUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async deleteLike (id: string | undefined | string[], postId: string){
    try{
      const response = await UserService.deleteLike(id, postId);
      this.setUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async getSecondUser (id: string | undefined | string[]){
    try{
      const response = await UserService.getSecondUser(id);
      this.setSecondUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async getFriend (friendId: string) {
    try{
      const response = await UserService.getFriend(friendId);
      return response.data
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async addFriend (id: string | undefined | string[], friendId: string | undefined | string[]){
    try{
      const response = await UserService.addFriend(id, friendId);
      this.setUser(response.data[0])
      this.setSecondUser(response.data[1])
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async deleteFriend (id: string | undefined | string[], friendId: string | undefined | string[]){
    try{
      const response = await UserService.deleteFriend(id, friendId);
      this.setUser(response.data[0])
      this.setSecondUser(response.data[1])
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async addComment (id: string | undefined | string[], authorId: string | undefined | string[], text: string, postId: string){
    try{
      const response = await UserService.addComment(id, authorId, text, postId);
      this.setUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }

  async deleteComment (id: string | undefined | string[], postId: string, commentId: string){
    try{
      const response = await UserService.deleteComment(id, postId, commentId);
      this.setSecondUser(response.data)
    } catch(e: any){
      console.log(e?.response?.data?.message)
    }
  }
}