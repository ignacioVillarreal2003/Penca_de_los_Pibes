import { Component, HostListener } from '@angular/core';
import Swal from 'sweetalert2'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  username: string = ""
  avatar: string = "";

  previousScrollPosition = 0;
  avatars: string[] = ["avatar-1.png", "avatar-2.png", "avatar-3.png", "avatar-4.png", "avatar-5.png", "avatar-6.png", "avatar-7.png", "avatar-8.png", "avatar-9.png", "avatar-10.png"]
  
  oldPassword: string = "";
  newPassword: string = "";

  constructor(private userService: UserService) {
    const username = userService.getUsernameLocalStorage();
    const avatar = userService.getAvatarLocalStorage();
    if (username != null){
      this.username = username;
    }
    if (avatar != null){
      this.avatar = avatar;
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
    const configurationSection = document.querySelector('.header-user .configuration-section') as HTMLElement;
    configurationSection.style.display = "flex";
    const body = document.querySelector('body') as HTMLElement;
    body.style.overflowY = "hidden";
  }

  CloseConfigurations(){
    const configurationSection = document.querySelector('.header-user .configuration-section') as HTMLElement;
    configurationSection.style.display = "none";

    /* Reset values */
    const mod1 = document.querySelector('.header-user .option-password') as HTMLElement;
    const mod2 = document.querySelector('.header-user .option-avatar') as HTMLElement;
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
    const mod1 = document.querySelector('.header-user .option-password') as HTMLElement;
    const mod2 = document.querySelector('.header-user .option-avatar') as HTMLElement;
    if (n == 1){
      mod1.style.display = "flex";
      mod2.style.display = "none";
    } else if (n == 2){
      mod1.style.display = "none";
      mod2.style.display = "flex";
    }
  }

  SetAvatar(avatar: string){
    this.avatar = avatar;
    this.userService.setAvatarLocalStorage(avatar);
    this.CloseConfigurations();
  }

  ChangeDarkColor(): void {    
    const body = document.querySelector('body') as HTMLElement;
    const mode = document.querySelector('.header-user .toggle-mode .input-mode') as HTMLInputElement;
    if (mode.checked == false){
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    }
  }

  ChangePassword(){
    if (this.oldPassword.length == 0 || this.newPassword.length == 0){
      this.ErrorMessage("Error en los datos ingresados.");
    } else {
      this.SuccesMessage("Contraseña cambiada con exito.")
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
