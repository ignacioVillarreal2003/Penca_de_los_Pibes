import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2'
import { IChampionship, IMatch, ITeam } from '../../types';
import { Time } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  mode: number = 1;

  championshipName: string = "";
  startDate: Date | undefined = undefined;
  endDate: Date | undefined = undefined;

  championships: IChampionship[] = []
  selectedChampionship: IChampionship | undefined = undefined;
  teamName: string = ""

  team1: string = "";
  team2: string = "";
  dateMatch: Date | undefined = undefined;
  group: string = "";
  stage: string = "";
  location: string = "";
  hourMatch: Time | undefined = undefined;

  matches: IMatch[] = []
  selectedMatch: IMatch | undefined = undefined;
  scoreTeam1: number = 0;
  scoreTeam2: number = 0;

  constructor(private httpService: HttpService) { }

  ngOnInit(){
    /*this.httpService.GetChampionshipsAdmin().subscribe(
      (response: any) => {
        this.championships = response
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );*/
  }

  CreateChampionship() {
    if (this.startDate && this.endDate) {
      const championship: IChampionship = {
        championshipName: this.championshipName,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.httpService.PostChampionshipAdmin(championship).subscribe(
        (response: any) => {
          this.SuccesMessage("Campeonato creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  AddTeam() {
    if (this.selectedChampionship){
      const team: ITeam = {
        championshipName: this.selectedChampionship.championshipName,
        teamName: this.championshipName,
      }
      this.httpService.PostTeamAdmin(team).subscribe(
        (response: any) => {
          this.SuccesMessage("Equipo creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  AddMatch() {
    if (this.selectedChampionship && this.dateMatch && this.hourMatch){
      const match: IMatch = {
        team1: this.team1,
        team2: this.team2,
        scoreTeam1: 0,
        scoreTeam2: 0,
        date: this.dateMatch,
        group: this.group,
        stage: this.stage,
        location: this.location,
        hour: this.hourMatch,
        championshipName: this.selectedChampionship.championshipName
      }
      this.httpService.PostMatchAdmin(match).subscribe(
        (response: any) => {
          this.SuccesMessage("Partido creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  UpdateMatches(){
    if (this.selectedChampionship){
      this.httpService.GetMatches(this.selectedChampionship.championshipName).subscribe(
        (response: any) => {
          this.matches = response;
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  AddResult() {
    if (this.selectedChampionship && this.selectedMatch){
      const result: IMatch = {
        team1: this.selectedMatch.team1,
        team2: this.selectedMatch.team2,
        scoreTeam1: this.scoreTeam1,
        scoreTeam2: this.scoreTeam2,
        date: this.selectedMatch.date,
        group: this.selectedMatch.group,
        stage: this.selectedMatch.stage,
        location: this.selectedMatch.location,
        hour: this.selectedMatch.hour,
        championshipName: this.selectedMatch.championshipName
      }
      this.httpService.PostResultAdmin(result).subscribe(
        (response: any) => {
          this.SuccesMessage("Equipo creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  ChangeMode(mode: number) {
    this.mode = mode;
    const mode1 = document.querySelector('.admin-home .content #mode1') as HTMLElement;
    const mode2 = document.querySelector('.admin-home .content #mode2') as HTMLElement;
    const mode3 = document.querySelector('.admin-home .content #mode3') as HTMLElement;
    const mode4 = document.querySelector('.admin-home .content #mode4') as HTMLElement;
    if (mode == 1) {
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "none";
    } else if (mode == 2) {
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
      mode4.style.display = "none";
    } else if (mode == 3) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
      mode4.style.display = "none";
    } else if (mode == 4) {
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

  Submit() {
    if (this.mode == 1) {
      this.CreateChampionship()
    } else if (this.mode == 2) {
      this.AddTeam()
    } else if (this.mode == 3) {
      this.AddMatch()
    } else if (this.mode == 4) {
      this.AddResult()
    }
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

  SuccesMessage(message: string) {
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
