import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  constructor(private userService: UserService){}

  score: string = "";

  ngOnInit(){
    this.score = this.userService.score;
  }
}
