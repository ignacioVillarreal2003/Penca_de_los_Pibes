import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  avatars: string[] = ["avatar-1.png", "avatar-2.png", "avatar-3.png", "avatar-4.png", "avatar-5.png", "avatar-6.png", "avatar-7.png", "avatar-8.png", "avatar-9.png", "avatar-10.png"]
  ci: string = "";
  username: string = "";
  score: string = "";
}
