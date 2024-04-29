import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsernameLocalStorage(){
    return localStorage.getItem('username');
  }

  setUsernameLocalStorage(username: string){
    localStorage.setItem('username', username);
    console.log("user");
  }

  getAvatarLocalStorage(){
    return localStorage.getItem('avatar');
  }

  setAvatarLocalStorage(avatar: string){
    localStorage.setItem('avatar', avatar);
  }
}
