import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  mode: number = 1;

  ChangeMode(mode: number){
    this.mode = mode;
    const mode1 = document.querySelector('.admin-home .content #mode1') as HTMLElement;
    const mode2 = document.querySelector('.admin-home .content #mode2') as HTMLElement;
    const mode3 = document.querySelector('.admin-home .content #mode3') as HTMLElement;
    const mode4 = document.querySelector('.admin-home .content #mode4') as HTMLElement;
    if (mode == 1){
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "none";
    } else if (mode == 2){
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
      mode4.style.display = "none";
    } else if (mode == 3){
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
      mode4.style.display = "none";
    } else if (mode == 4){
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "flex";
    }
  }

  HighlightOption(event: Event) {
    const target = event.target as HTMLElement;    
    const buttons = document.querySelectorAll('.admin-home aside button') as NodeListOf<HTMLElement>;
    buttons.forEach((button: HTMLElement) => {
      if (button === target) {
        button.classList.add('highlightOption');
      } else {
        button.classList.remove('highlightOption');
      }
    });
  }

  Submit(){
    if (this.mode == 1) {

    } else if (this.mode == 2){

    } else if (this.mode == 3){
      
    } else if (this.mode == 4){
      
    }
  }
}
