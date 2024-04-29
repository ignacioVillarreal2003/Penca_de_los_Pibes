import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.css'
})
export class AuthUserComponent {
  cedula: string = "";
  password: string = "";
  username: string = "";

  mode: "login" | "register" = "login";

  constructor(private router: Router, private userService: UserService){}

  ChangeModeLogin(){
    const modeLogin = document.querySelector('.ingreso .mode-login') as HTMLElement;
    const modeRegister = document.querySelector('.ingreso .mode-register') as HTMLElement;
    modeLogin.style.display = "flex";
    modeRegister.style.display = "none";
    this.mode = "login";
  }

  ChangeModeRegister(){
    const modeLogin = document.querySelector('.ingreso .mode-login') as HTMLElement;
    const modeRegister = document.querySelector('.ingreso .mode-register') as HTMLElement;
    modeLogin.style.display = "none";
    modeRegister.style.display = "flex";
    this.mode = "register";
  }

  Ingresar(){
    if (this.mode == "login"){
      this.LoginUsuario();
    } else if (this.mode == "register"){
      this.RegistrarUsuario();
    }
  }

  LoginUsuario(){
    if (this.CheckUserDataLogin()){
      // mandar a bd
      this.userService.setAvatarLocalStorage("avatar-1.png");
      this.userService.setUsernameLocalStorage(this.username);
    }
  }

  RegistrarUsuario(){
    if (this.CheckUserDataRegister()){
      // mandar a bd
      this.userService.setAvatarLocalStorage("avatar-1.png");
      this.userService.setUsernameLocalStorage(this.username);
    }
  }

  CheckUserDataLogin(){
    if (this.cedula.length < 8){
      this.ErrorMessage("La cedula es muy corta.")
      return false;
    } else if (this.password.length < 8){
      this.ErrorMessage("La contraseña es muy corta.")
      return false;
    }
    return true;
  }

  CheckUserDataRegister(){
    if (this.cedula.length < 8){
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

  async IngresoAdmin(){
    const { value: formValues } = await Swal.fire({
      title: "Admin login",
      showCancelButton: true,
      html: `
        <input id="swal-input-cedula-admin" class="swal2-input" placeholder="cedula">
        <input id="swal-input-password-admin" class="swal2-input" type="password" placeholder="password">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const cedula = document.getElementById("swal-input-cedula-admin") as HTMLInputElement;
        const password = document.getElementById("swal-input-password-admin") as HTMLInputElement;
        return [
          cedula.value,
          password.value
        ];
      }
    });
    if (formValues) {
      console.log(formValues);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(["/admin"])
    }
  }
}
