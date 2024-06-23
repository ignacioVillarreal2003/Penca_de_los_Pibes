import { Component, HostListener } from '@angular/core';
import Swal from 'sweetalert2'
import { UserService } from '../../services/user.service';
import { ICareerUser } from '../../types';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  username: string = "";
  score: string = "";
  avatar: string = "";
  avatars: string[] = []
  previousScrollPosition = 0;
  oldPassword: string = "";
  newPassword: string = "";
  career: string | undefined = undefined;
  careers: ICareerUser[] = []
  mail: string = "";

  constructor(private userService: UserService, private httpService: HttpService) {}

  ngOnInit(){      
    this.username = this.userService.username;
    this.score = this.userService.score;
    this.avatars = this.userService.avatars;
    const storedData = localStorage.getItem('avatar');    
    if (storedData != undefined) {      
      this.avatar = storedData;
    } else {      
      this.avatar = this.userService.avatars[Math.floor(Math.random() * this.userService.avatars.length) + 1];
      localStorage.setItem('avatar', this.avatar);
    }
    this.httpService.GetCareers().subscribe(
      (response: ICareerUser[]) => {
        this.careers = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  ChangeCareer(){
    if (this.career){
      this.httpService.ChangeCareer(this.career).subscribe(
        (response: any) => {
          this.SuccesMessage(response);
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  ChangeMail(){
    if (this.mail){
      this.httpService.ChangeMail(this.mail).subscribe(
        (response: any) => {
          this.SuccesMessage(response);
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  ChangePassword(){
    if (this.oldPassword.length < 8 || this.newPassword.length < 8){
      this.ErrorMessage("Error en los datos ingresados.");
    } else {
      this.httpService.ChangePassword(this.oldPassword, this.newPassword).subscribe(
        (response: any) => {
          this.SuccesMessage(response);
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const header = document.querySelector('header') as HTMLElement;
    const currentScrollPosition = window.pageYOffset;
    const scrollDifference = currentScrollPosition - this.previousScrollPosition;
    if (scrollDifference > 100) {
      header.style.top = "-100px";
      this.previousScrollPosition = currentScrollPosition;
    } else if (scrollDifference < -100) {
      header.style.top = "0px";
      this.previousScrollPosition = currentScrollPosition;
    }
  }

  OpenConfigurations(){
    const configurationSection = document.querySelector('.user-header .configuration-section') as HTMLElement;
    configurationSection.style.display = "flex";
    const body = document.querySelector('body') as HTMLElement;
    body.style.overflowY = "hidden";
  }

  CloseConfigurations(){
    const configurationSection = document.querySelector('.user-header .configuration-section') as HTMLElement;
    configurationSection.style.display = "none";
    const mod1 = document.querySelector('.user-header .option-password') as HTMLElement;
    const mod2 = document.querySelector('.user-header .option-avatar') as HTMLElement;
    mod1.style.display = "flex";
    mod2.style.display = "none";
    const inputs = mod1.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((e: HTMLInputElement) => {
      e.value = ""
    })
    const body = document.querySelector('body') as HTMLElement;
    body.style.overflowY = "auto";
  }

  ChangeOption(n: Number){    
    const mod1 = document.querySelector('.user-header .option-password') as HTMLElement;
    const mod2 = document.querySelector('.user-header .option-avatar') as HTMLElement;
    const mod3 = document.querySelector('.user-header .option-career') as HTMLElement;
    const mod4 = document.querySelector('.user-header .option-mail') as HTMLElement;
    if (n == 1){
      mod1.style.display = "flex";
      mod2.style.display = "none";
      mod3.style.display = "none";
      mod4.style.display = "none";
    } else if (n == 2){
      mod1.style.display = "none";
      mod2.style.display = "flex";
      mod3.style.display = "none";
      mod4.style.display = "none";
    } else if (n == 3){
      mod1.style.display = "none";
      mod2.style.display = "none";
      mod3.style.display = "flex";
      mod4.style.display = "none";
    } else if (n == 4){
      mod1.style.display = "none";
      mod2.style.display = "none";
      mod3.style.display = "none";
      mod4.style.display = "flex";
    }
  }

  SetAvatar(avatar: string){
    this.avatar = avatar;
    localStorage.setItem('avatar', avatar);
    this.CloseConfigurations();
  }

  ChangeDarkColor(): void {    
    const body = document.querySelector('body') as HTMLElement;
    const mode = document.querySelector('.user-header .toggle-mode .input-mode') as HTMLInputElement;
    if (mode.checked == false){
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    }
  }

  ErrorMessage(message: string){
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Close',
      timer: 2000,
      timerProgressBar: true
    })
  }

  SuccesMessage(message: string){
    Swal.fire({
      title: 'Bien!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Close',
      timer: 2000,
      timerProgressBar: true
    })
  }
}
