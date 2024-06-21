import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpService } from '../../services/http.service';
import { ITeamUser } from '../../types';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrl: './user-access.component.css'
})
export class UserAccessComponent {

  ci: string = "";
  password: string = "";
  username: string = "";
  teams: ITeamUser[] = [];

  constructor(private router: Router, private userService: UserService, private httpService: HttpService) { }

  GetTeams(){
    this.httpService.GetChampionshipTeams().subscribe(
      (response: ITeamUser[]) => {        
        this.teams = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  UserLogin() {
    if (this.CheckUserDataLogin()) {
      this.httpService.LoginUser(this.ci, this.password).subscribe(
        (response: any) => {
          localStorage.setItem('token', response[0]);
          this.router.navigate(["/userhome"])
          this.userService.username = response[1][0].username;
          this.userService.score = response[1][0].score;
          this.userService.ci = response[1][0].ci; 
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  async UserRegistration() {
    if (this.CheckUserDataRegister()) {
      const championshipData = await this.EnterChampionshipData();
      if (championshipData != undefined) {
        this.httpService.RegisterUser(this.ci, this.password, this.username, championshipData[0], championshipData[1]).subscribe(
          (response: any) => {            
            localStorage.setItem('token', response[0]);
            this.router.navigate(["/userhome"])
            this.userService.username = response[1][0].username;
            this.userService.score = response[1][0].score;
            this.userService.ci = response[1][0].ci;                                          
          },
          (error: any) => {
            this.ErrorMessage(error);
          }
        );
      }
    }
  }

  async AdminLogin() {
    const adminData = await this.EnterAdminData();
    if (adminData != undefined) {
      this.httpService.LoginAdmin(adminData[0], adminData[1]).subscribe(
        (response: any) => {
          localStorage.setItem('token', response);
          this.router.navigate(["/adminHome"]);
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  async EnterChampionshipData() {
    let dataChampion = `<select id="swal-select-champion" class="swal2-select" name="options">`
    let dataSubChampion = `<select id="swal-select-subchampion" class="swal2-select" name="options">`
    this.teams.forEach((team: ITeamUser) => {      
      dataChampion += `<option class="swal2-option" value="${team.teamName}">${team.teamName}</option>`
      dataSubChampion += `<option class="swal2-option" value="${team.teamName}">${team.teamName}</option>`
    })
    dataChampion += `</select>`
    dataSubChampion += `</select>`
    const { value: formValues } = await Swal.fire({
      title: "Ingrese sus predicciones!",
      showCancelButton: true,
      html: dataChampion + dataSubChampion,
      focusConfirm: false,
      preConfirm: () => {
        const champion = document.getElementById("swal-select-champion") as HTMLInputElement;
        const subchampion = document.getElementById("swal-select-subchampion") as HTMLInputElement;
        return [          
          champion.value,
          subchampion.value
        ];
      }
    });
    if (formValues && formValues[0] != formValues[1]) {
      return formValues;
    } else {
      this.ErrorMessage("No se a podido registrar.")
      return undefined
    }
  }

  async EnterAdminData() {
    const { value: formValues } = await Swal.fire({
      title: "Admin login",
      showCancelButton: true,
      html: `
        <label id="swal-label-ci-admin" class="swal2-label" for="swal-input-ci-admin">cedula</label>
        <input id="swal-input-ci-admin" class="swal2-input" placeholder="cedula">
        <label id="swal-label-password-admin" class="swal2-label" for="swal-input-password-admin">password</label>
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
      return formValues
    } else {
      return undefined;
    }
  }

  ChangeMode(mode: string) {
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

  CheckUserDataLogin() {
    if (this.ci.length != 8) {
      this.ErrorMessage("La cedula es incorrecta.")
      return false;
    } else if (this.password.length < 8) {
      this.ErrorMessage("La contraseña es muy corta.")
      return false;
    }
    return true;
  }

  CheckUserDataRegister() {
    if (this.ci.length != 8) {
      this.ErrorMessage("La cedula es incorrecta.")
      return false;
    } else if (this.password.length < 8) {
      this.ErrorMessage("La contraseña es muy corta.")
      return false;
    } else if (this.username.length == 0) {
      this.ErrorMessage("El usuario es incorrecto.")
      return false;
    }
    return true;
  }

  ErrorMessage(message: string) {
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
