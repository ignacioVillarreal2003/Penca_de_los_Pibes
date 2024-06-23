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
        this.FormatUserMatches();
        this.BlockPredictions(); 
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
        this.matches.forEach((match: IMatch) => {
          match.scoreTeam1 = 0;
          match.scoreTeam2 = 0;
        })
        this.FormatChampionshipMatches()
        this.FilterGroup("A");
        this.BlockPredictions()
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  FormatChampionshipMatches() {
    this.matches.forEach(match => {
      const dateObj = new Date(match.dateMatch);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObj.getDate()).slice(-2);
      const hours = ('0' + dateObj.getHours()).slice(-2);
      const minutes = ('0' + dateObj.getMinutes()).slice(-2);
      const seconds = ('0' + dateObj.getSeconds()).slice(-2);
      match.dateMatch = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    });
  }

  FormatUserMatches() {
    this.userMatches.forEach(match => {
      const dateObj = new Date(match.dateMatch);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObj.getDate()).slice(-2);
      const hours = ('0' + dateObj.getHours()).slice(-2);
      const minutes = ('0' + dateObj.getMinutes()).slice(-2);
      const seconds = ('0' + dateObj.getSeconds()).slice(-2);
      match.dateMatch = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    });
  }

  BlockPredictions() {
    this.userMatches.forEach((um: IMatch) => {
      this.matches.forEach((m: IMatch) => {
        if (um.championshipName1 == m.championshipName1 && um.dateMatch.slice(0, 10) == m.dateMatch.slice(0, 10) && um.team1 == m.team1 && um.team2 == m.team2) {
          m.scoreTeam1 = um.scoreTeam1;
          m.scoreTeam2 = um.scoreTeam2;
        }
      });
    });
  }

  SubmitPrediction(match: IMatch) {
    const currentDate = this.FormatDateH(new Date(), -1);
    if ( match.dateMatch >= currentDate) {      
      this.httpService.PostMatchPrediction(match, this.FormatDateH(new Date(), 0)).subscribe(
        (response: any) => {
          this.SuccesMessage(response);
          this.GetUserMatches();
        },
        (error: any) => {
          this.ErrorMessage(error);
          this.BlockPredictions();
          if (match.stage == "Grupos") {
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

  FormatDateH(date: Date, n: number) {
    date.setHours(date.getHours() - n);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
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
