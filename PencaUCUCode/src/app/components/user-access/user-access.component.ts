import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.css'
})
export class UserAccessComponent {

  ci: string = "";
  password: string = "";
  username: string = ""
  coutries: string[] = ["asdas", "sad asd"]

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(){
    // Traer campeonato, para saber id y realizar las demas operaciones
  }

  UserLogin(){
    if (this.CheckUserDataLogin()){
      // mandar a bd
      this.userService.username = this.username;  
      this.userService.avatar = "avatar-1.png";  
      this.router.navigate(["/userhome"])
    }
  }

  async UserRegistration(){
    if (this.CheckUserDataRegister()){
      const championshipData = await this.EnterChampionshipData()
      if (championshipData != undefined){
        // mandar a bd
        this.userService.username = this.username; 
        this.userService.avatar = "avatar-1.png";   
        this.router.navigate(["/userhome"])      
      }
    }
  }

  async AdminLogin(){
    const adminData = await this.EnterAdminData();
    if (adminData != undefined){
      // checkear datos en la base      
      this.router.navigate(["/adminHome"])
    }
  }

  async EnterChampionshipData(){
    let dataChampion = `<select id="swal-select-champion" class="swal2-select" name="options">`
    let dataRunnerUp = `<select id="swal-select-runner-up" class="swal2-select" name="options">`
    this.coutries.forEach((country: string) => {
      dataChampion += `<option class="swal2-option" value=${country}>${country}</option>`
      dataRunnerUp += `<option class="swal2-option" value=${country}>${country}</option>`
    })
    dataChampion += `</select>`
    dataRunnerUp += `</select>`
    const { value: formValues } = await Swal.fire({
      title: "Ingrese sus predicciones!",
      showCancelButton: true,
      html: dataChampion + dataRunnerUp,
      focusConfirm: false,
      preConfirm: () => {
        const champion = document.getElementById("swal-select-champion") as HTMLInputElement;
        const runnerUp = document.getElementById("swal-select-runner-up") as HTMLInputElement;
        return [
          champion.value,
          runnerUp.value
        ];
      }
    });
    if (formValues) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      return formValues;
    } else {
      this.ErrorMessage("No se a podido registrar.")
      return undefined
    }
  }

  async EnterAdminData(){
    const { value: formValues } = await Swal.fire({
      title: "Admin login",
      showCancelButton: true,
      html: `
        <input id="swal-input-ci-admin" class="swal2-input" placeholder="cedula">
        <input id="swal-input-password-admin" class="swal2-input" type="password" placeholder="contraseña">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const cedula = document.getElementById("swal-input-ci-admin") as HTMLInputElement;
        const password = document.getElementById("swal-input-password-admin") as HTMLInputElement;
        return [
          cedula.value,
          password.value
        ];
      }
    });
    if (formValues) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      return formValues
    } else {
      return undefined;
    }
  }

  ChangeMode(mode: string){
    const modeLogin = document.querySelector('.user-access #mode-login') as HTMLElement;
    const modeRegister = document.querySelector('.user-access #mode-register') as HTMLElement;
    if (mode == "login") {
      modeLogin.style.display = "flex";
      modeRegister.style.display = "none";
    } else if ((mode == "register")) {
      modeLogin.style.display = "none";
      modeRegister.style.display = "flex";
    }
  }

  CheckUserDataLogin(){
    if (this.ci.length < 8){
      this.ErrorMessage("La cedula es muy corta.")
      return false;
    } else if (this.password.length < 8){
      this.ErrorMessage("La contraseña es muy corta.")
      return false;
    }
    return true;
  }

  CheckUserDataRegister(){
    if (this.ci.length < 8){
      this.ErrorMessage("La cedula es muy corta.")
      return false;
    } else if (this.password.length < 8){
      this.ErrorMessage("La contraseña es muy corta.")
      return false;
    } else if (this.username.length == 0){
      this.ErrorMessage("El usuario es incorrecto.")
      return false;
    }
    return true;
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
}
