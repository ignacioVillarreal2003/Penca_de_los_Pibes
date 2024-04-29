import { Component } from '@angular/core';
import { IMatch } from '../../interfaces/IMatch';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.css'
})
export class PredictionsComponent {
  modeFilter: string = "Grupo A";
  matches: IMatch[] = [];
  selectedMatches: IMatch[] = []

  ngOnInit() {
    const mañana = new Date();
    mañana.setMonth(5);
    this.matches = [
      {
        team1: "Peru",
        team2: "Uruguay",
        shieldTeam1: "barcelona.png",
        shieldTeam2: "barcelona.png",
        date: new Date(),
        group: "Grupo A",
        stage: "semifinal",
        scoreTeam1: 0,
        scoreTeam2: 0,
      },
      {
        team1: "Bolivia",
        team2: "Uruguay",
        shieldTeam1: "barcelona.png",
        shieldTeam2: "barcelona.png",
        date: mañana,
        group: "Grupo A",
        stage: "octavos",
        scoreTeam1: 0,
        scoreTeam2: 0,
      },
      {
        team1: "Bolivia",
        team2: "Uruguay",
        shieldTeam1: "barcelona.png",
        shieldTeam2: "barcelona.png",
        date: new Date(),
        group: "Grupo B",
        stage: "octavos",
        scoreTeam1: 0,
        scoreTeam2: 0,
      }
    ]
    this.FilterGroup(this.modeFilter);
    const clickedButton = document.querySelector('.predictions .btn-A') as HTMLElement;
    clickedButton.style.backgroundColor = "var(--color1)";
    clickedButton.style.color = "var(--textColor)";
  }

  FilterGroup(value: string) {
    this.selectedMatches = [];
    this.matches.forEach((e: IMatch) => {
      if (e.group == value) {
        this.selectedMatches.push(e);
      }
    })
    this.modeFilter = value;
  }

  FilterStage(value: string) {
    this.selectedMatches = [];
    this.matches.forEach((e: IMatch) => {
      if (e.stage == value) {
        this.selectedMatches.push(e);
      }
    })
    this.modeFilter = value;
  }

  ChangeScore(match: IMatch, team: number, n: number) {
    this.matches.forEach((e: IMatch) => {
      if (e.team1 == match.team1 && e.team2 == match.team2) {
        if (team == 1) {
          e.scoreTeam1 += n;
          if (e.scoreTeam1 < 0) {
            e.scoreTeam1 = 0;
          }
        } else if (team == 2) {
          e.scoreTeam2 += n;
          if (e.scoreTeam2 < 0) {
            e.scoreTeam2 = 0;
          }
        }
      }
    })
    if (this.modeFilter.includes("Grupo")){
      this.FilterGroup(this.modeFilter);
    } else {
      this.FilterStage(this.modeFilter);
    }
  }

  MarcarBoton(event: any){
    const buttons = document.querySelectorAll('.predictions .selectors button') as NodeListOf<HTMLElement>;
    buttons.forEach((e: HTMLElement) => {
      e.style.backgroundColor = "var(--textColor)";
      e.style.color = "var(--bgColor)";
    })
    const clickedButton = event.target as HTMLElement;
    clickedButton.style.backgroundColor = "var(--color1)";
    clickedButton.style.color = "var(--textColor)";
  }

  SubmitPrediction(match: IMatch) {
    if (match.date >= new Date){
      this.SuccesMessage("Se ha registrado la prediccion.")
    } else {
      this.ErrorMessage("Se acabo el tiempo.")
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
