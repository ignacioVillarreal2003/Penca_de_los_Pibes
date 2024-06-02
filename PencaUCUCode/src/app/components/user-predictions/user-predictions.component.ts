import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpService } from '../../services/http.service';
import { IMatch } from '../../types';

@Component({
  selector: 'app-user-predictions',
  templateUrl: './user-predictions.component.html',
  styleUrl: './user-predictions.component.css'
})
export class UserPredictionsComponent {
  modeFilter: string = "Grupo A";
  matches: IMatch[] = [];
  selectedMatches: IMatch[] = []

  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.FilterGroup(this.modeFilter);
    /*this.httpService.GetChampionshipMatches().subscribe(
      (response: any) => {
        this.matches = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );*/
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

  HighlightButton(event: any){
    const target = event.target as HTMLElement;    
    const buttons = document.querySelectorAll('.predictions .selectors button') as NodeListOf<HTMLElement>;
    buttons.forEach((button: HTMLElement) => {
      if (button === target) {
        button.classList.add('btn-highlight');
      } else {
        button.classList.remove('btn-highlight');
      }
    });
  }

  SubmitPrediction(match: IMatch) {
    if (match.date < new Date){
      this.httpService.PostMatchPrediction(match).subscribe(
        (response: any) => {
          this.SuccesMessage("Se ha registrado la prediccion.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
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
