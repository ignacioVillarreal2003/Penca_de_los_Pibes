import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpService } from '../../services/http.service';
import { IChampionship } from '../../types';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.css'
})
export class UserAccessComponent {

  ci: string = "";
  password: string = "";
  username: string = "";
  championship: IChampionship | undefined = undefined;
  coutries: string[] = ["asdas", "sad asd"]

  constructor(private router: Router, private userService: UserService, private httpService: HttpService){}

  ngOnInit(){
    /*this.httpService.GetChampionshipUser().subscribe(
      (response: any) => {
        this.championship = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );*/
  }

  UserLogin(){
    if (this.CheckUserDataLogin()){
      const user = {
        ci: this.ci,
        password: this.password,
      }
      this.httpService.LoginUser(user).subscribe(
        (response: any) => {
          localStorage.setItem('token', response);
          this.router.navigate(["/userhome"])
          this.userService.username = this.username;  
          this.userService.avatar = "avatar-1.png";  
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  async UserRegistration(){
    if (this.CheckUserDataRegister()){
      const championshipData = await this.EnterChampionshipData()
      if (championshipData != undefined){
        const user = {
          ci: this.ci,
          password: this.password,
          username: this.username,
          champion: championshipData[0],
          runnerUp: championshipData[1]
        }
        this.httpService.RegisterUser(user).subscribe(
          (response: any) => {
            localStorage.setItem('token', response);
            this.router.navigate(["/userhome"])
            this.userService.username = this.username;  
            this.userService.avatar = "avatar-1.png";  
          },
          (error: any) => {
            this.ErrorMessage(error);
          }
        );
      }
    }
  }

  async AdminLogin(){
    const adminData = await this.EnterAdminData();
    if (adminData != undefined){
      const user = {
        ci: this.ci,
        password: this.password,
      }
      this.httpService.LoginUser(user).subscribe(
        (response: any) => {
          localStorage.setItem('token', response);
          this.router.navigate(["/adminHome"])
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );   
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
