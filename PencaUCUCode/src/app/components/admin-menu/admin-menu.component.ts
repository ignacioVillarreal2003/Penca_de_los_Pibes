import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {

  ChangeMode(mode: number){
    const mode1 = document.querySelector('.admin-menu .content #mode1') as HTMLElement;
    const mode2 = document.querySelector('.admin-menu .content #mode2') as HTMLElement;
    const mode3 = document.querySelector('.admin-menu .content #mode3') as HTMLElement;
    const mode4 = document.querySelector('.admin-menu .content #mode4') as HTMLElement;
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

}
