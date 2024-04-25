import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  previousScrollPosition = 0;
  
  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const header = document.querySelector('header') as HTMLElement;
    const currentScrollPosition = window.pageYOffset;
    
    const scrollDifference = currentScrollPosition - this.previousScrollPosition;
    
    if (scrollDifference > 100) {
      console.log('El usuario está bajando más de 50px');
      header.style.top = "-100px";
      this.previousScrollPosition = currentScrollPosition;

    } else if (scrollDifference < -100) {
      console.log('El usuario está subiendo más de 50px');
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
}
