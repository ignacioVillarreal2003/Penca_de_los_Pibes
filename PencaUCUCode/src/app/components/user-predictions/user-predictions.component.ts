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
  matches: IMatch[] = [];
  selectedMatches: IMatch[] = [];
  userMatches: IMatch[] = [];
  filter: string = "A"

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.GetUserMatches();
    this.GetChampionshipMatches();
  }

  GetUserMatches() {
    this.httpService.GetUserMatches().subscribe(
      (response: IMatch[]) => {
        this.userMatches = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  GetChampionshipMatches() {
    this.httpService.GetChampionshipMatches().subscribe(
      (response: IMatch[]) => {
        this.matches = response;
        this.FilterGroup("A");
        this.BlockPredictions()
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  BlockPredictions() {
    this.userMatches.forEach((um: IMatch) => {
      this.matches.forEach((m: IMatch) => {
        if (um.championshipName1 == m.championshipName1 && um.dateMatch == m.dateMatch && um.team1 == m.team1 && um.team2 == m.team2) {
          m.scoreTeam1 = um.scoreTeam1;
          m.scoreTeam2 = um.scoreTeam2;
        }
      });
    });
  }

  FilterGroup(value: string) {
    this.selectedMatches = [];
    this.matches.forEach((e: IMatch) => {
      if (e.teamGroup1 == value && e.stage == "Grupos") {
        this.selectedMatches.push(e);
      }
    })
    this.filter = value;
  }

  FilterStage(value: string) {        
    this.selectedMatches = [];
    this.matches.forEach((e: IMatch) => {
      if (e.stage == value) {
        this.selectedMatches.push(e);
      }
    })
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
  }

  HighlightButton(event: any) {
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
    const matchDate = new Date(match.dateMatch).toISOString().slice(0, 10);
    const currentDate = new Date().toISOString().slice(0, 10);
    match.dateMatch = matchDate;
    if (matchDate > currentDate) {
      this.httpService.PostMatchPrediction(match).subscribe(
        (response: any) => {
          this.SuccesMessage(response);
          this.GetUserMatches();
          this.BlockPredictions();
        },
        (error: any) => {
          this.ErrorMessage(error);
          this.GetUserMatches();
          this.BlockPredictions();
          if (match.stage == "Group"){
            this.FilterGroup(this.filter);
          } else {                        
            this.FilterStage(match.stage);
          }
        }
      );
    } else {
      this.ErrorMessage("Se acabo el tiempo.");
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
